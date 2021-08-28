import React from "react";
import Head from "next/head";
import GithubCorner from "react-github-corner";
import { HighlightWithinTextarea } from "react-highlight-within-textarea";

import { Kwic } from "@strboul/kwic-ts";

const DEFAULT_WINDOWS = { left: 3, right: 3 };
const DEFAULT_TERM = "phrase";
const DEFAULT_TEXT = `The earliest known appearance of the phrase is from The Boston Journal. In an article titled "Current Notes" in the February 9, 1885, edition, the phrase is mentioned as a good practice sentence for writing students: "A favorite copy set by writing teachers for their pupils is the following, because it contains every letter of the alphabet: 'A quick brown fox jumps over the lazy dog.'"[2] Dozens of other newspapers published the phrase over the next few months, all using the version of the sentence starting with "A" rather than "The".[3] The earliest known use of the phrase starting with "The" is from the 1888 book Illustrative Shorthand by Linda Bronson.[4] The modern form (starting with "The") became more common despite the fact that it is slightly longer than the original (starting with "A").

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

const AppBody = ({ children }) => {
  return <div className="AppBody">{children}</div>;
};

const Title = () => {
  return (
    <h1>
      <span className="Title">KWIC | Keyword-in-contexts</span>
    </h1>
  );
};

const GithubRibbon = () => {
  return (
    <GithubCorner
      href="https://github.com/strboul/kwic-ts"
      target="_blank"
      rel="noopener noreferrer"
      bannerColor="#000"
      octoColor="#fff"
      size={80}
      direction="right"
    />
  );
};

const InputBody = ({ children }) => {
  return <div className="InputBody">{children}</div>;
};

const InputTerm = ({ term, setTerm }) => {
  return (
    <div className="Input">
      <label className="Label">term</label>
      <input
        type="text"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
      />
    </div>
  );
};

const InputWindow = ({ id, windows, setWindows }) => {
  return (
    <div className="Input">
      <label className="Label">window {id}</label>
      <input
        type="number"
        value={windows[id]}
        min={0}
        onChange={(event) =>
          setWindows((prevState) => ({
            ...prevState,
            [id]: Number.parseInt(event.target.value),
          }))
        }
      />
    </div>
  );
};

const createHighlightArr = (ranges) => {
  const out = ranges.map((range) => [
    {
      highlight: range.index,
      className: "red",
    },
    {
      highlight: range.left,
      className: "blue",
    },
    {
      highlight: range.right,
      className: "blue",
    },
  ]);
  return out.flat();
};

const TextField = ({ textField, setTextField, ranges }) => {
  const highlight = createHighlightArr(ranges);

  return (
    <div className="FieldBlock">
      <label className="Label">text</label>
      <div className="TextField">
        <HighlightWithinTextarea
          value={textField}
          highlight={highlight}
          rows="20"
          containerStyle={{ width: "100%" }}
          style={{ width: "100%", borderStyle: "none" }}
          onChange={(event) => setTextField(event.target.value)}
        />
      </div>
    </div>
  );
};

const Concordance = ({ matches }) => {
  const Spacing = () => {
    return <span style={{ marginLeft: "1em" }} />;
  };

  const StyleIndex = ({ obj }) => {
    return (
      <td style={{ textAlign: "centre" }}>
        <mark className="red">
          <b>{obj}</b>
        </mark>
        <Spacing />
      </td>
    );
  };

  const StyleSides = ({ arr, align }) => {
    return (
      <td style={{ textAlign: align }}>
        {arr.map((a) => (
          <span key={a}>
            <mark className="blue">{a}</mark>
            <Spacing />
          </span>
        ))}
      </td>
    );
  };

  const LineNumber = ({ index }) => {
    return (
      <td>
        <span
          style={{
            fontSize: "0.75em",
            marginRight: "2em",
            padding: "0.4em",
            color: "darkgray",
          }}
        >
          {index}
        </span>
      </td>
    );
  };

  return (
    <div className="FieldBlock">
      <label className="Label">concordance</label>
      <div className="TextField">
        <table>
          <tbody>
            {matches.map((match, index) => (
              <tr key={index}>
                <LineNumber index={index} />
                <StyleSides arr={match.left} align="right" />
                <StyleIndex obj={match.index} />
                <StyleSides arr={match.right} align="left" />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Index = () => {
  // TODO useReducer?
  const [windows, setWindows] = React.useState(DEFAULT_WINDOWS);
  const [term, setTerm] = React.useState(DEFAULT_TERM);
  const [textField, setTextField] = React.useState(DEFAULT_TEXT);
  const [ranges, setRanges] = React.useState([]);
  const [matches, setMatches] = React.useState([]);

  React.useEffect(() => {
    const kwic = new Kwic(textField, term, Object.values(windows));
    const ranges = kwic.getRanges();
    setRanges(ranges);
    const matches = kwic.getMatches();
    setMatches(matches);
  }, [textField, term, windows]);

  return (
    <>
      <AppHead />
      <AppBody>
        <Title />
        <GithubRibbon />
        <InputBody>
          <InputTerm term={term} setTerm={setTerm} />
          <InputWindow id="left" windows={windows} setWindows={setWindows} />
          <InputWindow id="right" windows={windows} setWindows={setWindows} />
        </InputBody>
        <TextField
          textField={textField}
          setTextField={setTextField}
          ranges={ranges}
        />
        <Concordance matches={matches} />
      </AppBody>
    </>
  );
};

export default Index;
