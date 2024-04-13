import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function KeywordInput() {
  const [input, setInput] = useState<string>("");
  //   const { keywords, setKeywords } = useValues();

  function handleChange(event: any) {
    setInput(event.target.value);
  }
  function handleClick(e: any) {
    e.preventDefault();

    // setKeywords([...keywords, input]);
  }
  return (
    <div className="flex flex-initial items-center gap-2">
      <div className="flex items-center justify-center gap-2">
        <Input placeholder="Keyword" onChange={handleChange} className="text-center sm:w-24" />
        <Button onClick={handleClick} size={"sm"}>
          <Plus size={16} />
        </Button>
      </div>
      {/* <div className="grow">
                {keywords.map((keyword, index) => {
                    return (
                        <div key={index} className="flex items-center gap-2">
                            {keyword}
                            <Button size={'sm'}>
                                <CrossIcon size={12} />
                            </Button>
                        </div>
                    )
                })}
            </div> */}
    </div>
  );
}

export default KeywordInput;
