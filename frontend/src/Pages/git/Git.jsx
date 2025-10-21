import SEOHead from "../../components/SEO/SEOHead";
import Main from "./components/Main";

const Git = () => {
  return (
    <>
      <SEOHead
        title="Git & GitHub Survival Guide 2025"
        description="Scenario-based Git commands, GitHub workflows, security and performance best practices with instant copy-paste solutions."
        keywords="git, github, commands, workflows, merge, rebase, pull request, actions, reflog, bisect, stash, LFS, branch protection"
        type="article"
      />
      <main id="git-guide" aria-label="Git and GitHub Survival Guide">
        <Main />
      </main>
    </>
  );
};

export default Git;
