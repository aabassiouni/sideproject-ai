"use client";

import { useGeneration } from "@/lib/store";
import { motion } from "framer-motion";
import CopyToClipboardButton from "./buttons/CopyToClipboardButton";
import RatingButton from "./buttons/RatingButton";
import { Card, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";

function Generation() {
  const generation = useGeneration();
  return generation ? (
    <Card className="m-4 mt-0 h-max border-2 border-sky-600 sm:min-w-0 dark:bg-gray-800">
      <div className={"flex h-full items-start justify-start rounded-lg p-2 sm:p-5"}>
        <div className="h-full w-full space-y-2 rounded-md bg-slate-100 p-2 text-lg dark:bg-gray-900 sm:p-10">
          <div className="flex justify-between">
            <p className="my-1 font-bold">{generation.name}</p>
            <RatingButton generationID={generation.id} />
          </div>
          <Separator className="" />
          {generation.bullets.map((bullet, i) => (
            <motion.div
              initial={{
                opacity: 0,
                translateY: 50,
                // translateY: i % 2 === 0 ? -50 : 50,
                // translateX: -50,
              }}
              key={i}
              className="w-full"
              animate={{ opacity: 1, translateX: 0, translateY: 0 }}
              transition={{ duration: 0.3, delay: i * 0.3 }}
            >
              <Card className="dark:bg-gray-800">
                <CardHeader className="flex-row items-center justify-between">
                  <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
                    <li className="list-disc">{bullet}</li>
                  </ul>
                  <CopyToClipboardButton textToCopy={bullet} />
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  ) : (
    <Card className="m-4 mt-2 h-full sm:min-w-0 dark:bg-gray-800">
      <div className={"flex h-full items-start justify-start rounded-lg p-5"}>
        <p className="mx-auto my-auto text-slate-400">Your Generation will appear here!</p>
      </div>
    </Card>
  );
}

export default Generation;
