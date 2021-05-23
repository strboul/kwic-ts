import React, { useEffect, useState } from "react";
import Head from "next/head";
import GithubCorner from "react-github-corner";
// @ts-ignore
import { HighlightWithinTextarea } from "react-highlight-within-textarea";

// import Kwic from "@strboul/kwic-ts";
import Kwic from "../../dist/kwic";

const DEFAULT_TERM = "fox";
const DEFAULT_TEXTFIELD = `The earliest known appearance of the phrase is from The Boston Journal. In an article titled "Current Notes" in the February 9, 1885, edition, the phrase is mentioned as a good practice sentence for writing students: "A favorite copy set by writing teachers for their pupils is the following, because it contains every letter of the alphabet: 'A quick brown fox jumps over the lazy dog.'"[2] Dozens of other newspapers published the phrase over the next few months, all using the version of the sentence starting with "A" rather than "The".[3] The earliest known use of the phrase starting with "The" is from the 1888 book Illustrative Shorthand by Linda Bronson.[4] The modern form (starting with "The") became more common despite the fact that it is slightly longer than the original (starting with "A").

As the use of typewriters grew in the late 19th century, the phrase began appearing in typing lesson books as a practice sentence. Early examples include How to Become Expert in Typewriting: A Complete Instructor Designed Especially for the Remington Typewriter (1890),[5] and Typewriting Instructor and Stenographer's Hand-book (1892). By the turn of the 20th century, the phrase had become widely known. In the January 10, 1903, issue of Pitman's Phonetic Journal, it is referred to as "the well known memorized typing line embracing all the letters of the alphabet".[6] Robert Baden-Powell's book Scouting for Boys (1908) uses the phrase as a practice sentence for signaling.[1]

The first message sent on the Moscow–Washington hotline on August 30, 1963, was the test phrase "THE QUICK BROWN FOX JUMPED OVER THE LAZY DOG'S BACK 1234567890".[7] Later, during testing, the Russian translators sent a message asking their American counterparts, "What does it mean when your people say 'The quick brown fox jumped over the lazy dog'?"[8]

Source: https://en.wikipedia.org/wiki/The_quick_brown_fox_jumps_over_the_lazy_dog`;

const AppHead = () => {
  return (
    <Head>
      <title>KWIC | Keyword-in-contexts</title>
    </Head>
  );
};

interface IWrapper {
  children: React.ReactNode;
}

const AppBody = ({ children }: IWrapper) => {
  return <div className="py-8 px-8 h-screen md:px-24">{children}</div>;
};

const Title = () => {
  return (
    <div>
      <p className="text-lg font-bold md:text-3xl">
        <span className="px-4 pt-2 pb-4 text-yellow-700 bg-yellow-200 rounded-xl">
          KWIC | Keyword-in-contexts
        </span>
      </p>
    </div>
  );
};

interface ITermInput {
  term: string;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
}

const TermInput = ({ term, setTerm }: ITermInput) => {
  return (
    <div className="px-6 py-4">
      <label className="block italic text-gray-600">Term</label>
      <input
        type="text"
        className="py-1 pl-2 border border-l-8 border-blue-500 rounded-sm focus:bg-blue-100"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
      />
    </div>
  );
};

interface ITextFieldInput {
  textField: string;
  setTextField: React.Dispatch<React.SetStateAction<string>>;
}

const TextFieldInput = ({ textField, setTextField }: ITextFieldInput) => {
  const highlight = [
    {
      highlight: [6, 11],
      className: "red",
    },
    {
      highlight: [12, 17],
      className: "blue",
    },
    {
      highlight: [18, 21],
      className: "red",
    },
  ];
  return (
    <div className="px-6 py-2">
      <HighlightWithinTextarea
        value={textField}
        highlight={highlight}
        rows="20"
        containerStyle={{ width: "100%" }}
        style={{ width: "100%", borderStyle: "none" }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setTextField(event.target.value)
        }
      />
    </div>
  );
};

const GithubRibbon = () => {
  return (
    <GithubCorner
      href="https://github.com/strboul/kwic-ts"
      bannerColor="#000"
      octoColor="#fff"
      size={80}
      direction="right"
    />
  );
};

const InputBody = ({ children }: IWrapper) => {
  return <div className="py-4 bg-yellow-100 rounded-xl">{children}</div>;
};

const Index = () => {
  const [textField, setTextField] = useState<string>(DEFAULT_TEXTFIELD);
  const [term, setTerm] = useState<string>(DEFAULT_TERM);

  useEffect(() => {
    const kwic = new Kwic(textField, term);
    console.log(kwic.locate());
  }, [textField, term]);

  return (
    <>
      <AppHead />
      <AppBody>
        <Title />
        <GithubRibbon />
        <InputBody>
          <TermInput term={term} setTerm={setTerm} />
          <TextFieldInput textField={textField} setTextField={setTextField} />
        </InputBody>
      </AppBody>
    </>
  );
};

export default Index;
