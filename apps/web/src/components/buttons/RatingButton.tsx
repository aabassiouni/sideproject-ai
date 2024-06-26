import { Loader2, ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

function RatingButton({ generationID }: { generationID: string }) {
  const [likeClicked, setLikeClicked] = React.useState(false);
  const [dislikeClicked, setDislikeClicked] = React.useState(false);
  const [likeIsLoading, setLikeIsLoading] = React.useState(false);
  const [dislikeIsLoading, setDislikeIsLoading] = React.useState(false);
  async function handleLike() {
    if (!likeClicked) {
      setLikeIsLoading(true);

      await fetch("/api/rate", {
        method: "POST",
        body: JSON.stringify({
          rating: 1,
          generationID: generationID,
        }),
      });

      setLikeClicked(true);
      setDislikeClicked(false);
      setLikeIsLoading(false);
    }
  }

  async function handleDislike() {
    if (!dislikeClicked) {
      setDislikeIsLoading(true);

      await fetch("/api/rate", {
        method: "POST",
        body: JSON.stringify({
          rating: -1,
          generationID: generationID,
        }),
      });

      setDislikeClicked(true);
      setLikeClicked(false);
      setDislikeIsLoading(false);
    }
  }

  return (
    <div className="mr-4 inline-flex flex-col gap-2 sm:flex-row">
      <Button
        className="group inline-flex items-center justify-center gap-2 rounded border-2 border-slate-300 bg-slate-200 p-1 active:animate-click disabled:animate-none disabled:border-green-700 hover:bg-slate-300 disabled:opacity-100"
        onClick={handleLike}
        disabled={!dislikeClicked && likeClicked}
      >
        <div className="h-5 w-5">
          {likeIsLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <ThumbsUp className={"text-slate-600 group-disabled:text-green-700"} />
          )}
        </div>
        <p className="font-azeret text-slate-600 tracking-tighter group-disabled:text-green-700">Like</p>
      </Button>
      <Button
        className="group inline-flex items-center justify-center gap-2 rounded border-2 border-slate-300 bg-slate-200 p-1 active:animate-click disabled:animate-none disabled:border-red-400 hover:bg-slate-300 disabled:opacity-100"
        onClick={handleDislike}
        disabled={dislikeClicked && !likeClicked}
      >
        <div className="h-5 w-5">
          {dislikeIsLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <ThumbsDown className={"text-slate-600 group-disabled:text-red-700"} />
          )}
        </div>
        <p className="font-azeret text-slate-600 tracking-tighter group-disabled:text-red-700">Dislike</p>
      </Button>
    </div>
  );
}
export default RatingButton;
