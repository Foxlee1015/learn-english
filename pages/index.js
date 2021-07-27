import LinkCard from "../components/common/LinkCard";

export default function Home({}) {
  return (
    <div>
      <div>
        <LinkCard
          title={"Prasal verbs"}
          desc={"Prasal verbs ~~~~"}
          href={"/phrasalVerbs"}
        />
        <LinkCard title={"Idioms"} desc={"Idioms ~~~~"} href={"/idioms"} />
        <LinkCard
          title={"Quiz"}
          desc={"Prasal verbs / quiz ~~~"}
          href={"/game"}
        />
      </div>
    </div>
  );
}
