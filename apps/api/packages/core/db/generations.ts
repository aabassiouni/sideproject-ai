import { eq, generations, sql, users } from "@sideproject-ai/db";
import { db } from "./db";
import { fetchUserRepos } from "./users";

export async function insertGeneration({
  generation_id,
  userID,
  owner,
  repo,
  text,
  bullets,
  regeneration,
}: {
  generation_id: string;
  userID: string;
  owner: string;
  repo: string;
  text: string;
  bullets: string[];
  regeneration: boolean;
}) {
  console.log("inserting generation");

  const repoName = `${owner}/${repo}`;
  const repos = await fetchUserRepos(userID);
  console.log("repos", repos);

  await db.transaction(async (tx) => {
    if (!regeneration) {
      console.log("decreasing user credits");
      const [{ credits }] = await tx
        .update(users)
        .set({ credits: sql`credits - 1` })
        .where(eq(users.userID, userID))
        .returning({
          credits: users.credits,
        });

      if (credits < 0) {
        console.log("credits less than zero, rolling back");
        tx.rollback();
        return { error: "Not enough credits" };
      }
    }

    console.log("inserting generation");
    await tx.insert(generations).values({
      generationID: generation_id,
      userID: userID,
      repoName: `${owner}/${repo}`,
      generatedText: text,
      bullets: JSON.stringify(bullets),
    });

    console.log("inserting into user repos");
    if (repos[repoName]) {
      console.log("repo exists, updating");
      await tx
        .update(users)
        .set({
          repos: {
            ...repos,
            [repoName]: repos[repoName] + 1,
          },
        })
        .where(eq(users.userID, userID));
    } else {
      console.log("repo does not exist, inserting");
      await tx
        .update(users)
        .set({ repos: { ...repos, [repoName]: 1 } })
        .where(eq(users.userID, userID));
    }
  });

  return;
}
