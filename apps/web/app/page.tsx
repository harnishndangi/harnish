import Chapter0Invitation from "@/components/chapters/Chapter0Invitation";
import Chapter1HowItBegan from "@/components/chapters/Chapter1HowItBegan";
import Chapter2Gallery from "@/components/chapters/Chapter2Gallery";
import Chapter3WhyILoveYou from "@/components/chapters/Chapter3WhyILoveYou";
import Chapter4TheQuestion from "@/components/chapters/Chapter4TheQuestion";
import Chapter5Celebration from "@/components/chapters/Chapter5Celebration";

export default function Home() {
  return (
    <>
      {/* Chapter 0 – The Invitation (hero / dark starfield) */}
      <section id="chapter-0" data-chapter="0">
        <Chapter0Invitation />
      </section>

      {/* Chapter 1 – How It Began (storybook paper) */}
      <section id="chapter-1" data-chapter="1">
        <Chapter1HowItBegan />
      </section>

      {/* Chapter 2 – Little Moments Gallery (horizontal scroll) */}
      <section id="chapter-2" data-chapter="2">
        <Chapter2Gallery />
      </section>

      {/* Chapter 3 – Why I Love You (flip-reveal reasons) */}
      <section id="chapter-3" data-chapter="3">
        <Chapter3WhyILoveYou />
      </section>

      {/* Chapter 4 – The Question (climax, infinity draw, buttons) */}
      <section id="chapter-4" data-chapter="4">
        <Chapter4TheQuestion />
      </section>

      {/* Chapter 5 – The Celebration (confetti, heartfelt close) */}
      <section id="chapter-5" data-chapter="5">
        <Chapter5Celebration />
      </section>
    </>
  );
}
