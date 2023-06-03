import React from "react";
import {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";
import clerk from "@clerk/clerk-sdk-node";
import { conn } from "@/lib/planetscale";
import DashboardNavbar from "@/components/DashboardNavbar";
import GenerationsCard from "@/components/GenerationsCard";

export const dynamic = 'force-dynamic';

async function DashboardPage() {
	const user = await currentUser();
	// const user = {
	// 	id: "ckuqj2q6q0000g1tq6q9q1q7q",
	// 	username: "josh",
	// }
	console.log(user)

	const results = await conn.execute(
		"SELECT user_id, repo_name, created_on_date, generated_text, BIN_TO_UUID(generation_id) AS generation_id_uuid FROM generations;",
		[user?.id]
	);
	let generations = results.rows;

	return (
			<div className="flex flex-col gap-4 p-4 items-center h-screen">
				<Card className="mt-10 w-full sm:w-[450px]">
					<CardHeader className="text-center flex gap-4 justify-center items-center flex-row">
						<div className="grow">
							<p className="text-lg font-semibold">{user?.username ?? user?.emailAddresses[0].emailAddress}</p>
						</div>
						<div className="space-x-4">
							<Link href="/dashboard/write">
								<Button>Generate</Button>
							</Link>
						</div>
					</CardHeader>
				</Card>
				<GenerationsCard generations={generations}/>
				
			</div>
	);
}

export default DashboardPage;
