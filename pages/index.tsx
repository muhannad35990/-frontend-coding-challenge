import { AbsencesContent } from "components/organisms";
import AppTemplate from "components/templates/app";

export default function Home() {
  return (
    <AppTemplate title="test title" description="test description">
      <AbsencesContent />
    </AppTemplate>
  );
}
