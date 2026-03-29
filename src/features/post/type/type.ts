import AngryEmoticon from "@/features/post/assets/angry.svg";
import AngryAnimEmoticon from "@/features/post/assets/angry-anim.webp";
import AnxiousEmoticon from "@/features/post/assets/anxious-3d.svg";
import AstonishEmoticon from "@/features/post/assets/astonish-3d.svg";
import CalmEmoticon from "@/features/post/assets/calm-3d.svg";
import CryEmoticon from "@/features/post/assets/cry-3d.svg";
import HandsomeEmoticon from "@/features/post/assets/handsome.svg";
import HandsomeAnimEmoticon from "@/features/post/assets/handsome-anim.webp";
import HappyEmoticon from "@/features/post/assets/happy.svg";
import HappyAnimEmoticon from "@/features/post/assets/happy-anim.webp";
import RageEmoticon from "@/features/post/assets/rage-3d.svg";
import SadEmoticon from "@/features/post/assets/sad.svg";
import SadAnimEmoticon from "@/features/post/assets/sad-anim.webp";
import SmileEmoticon from "@/features/post/assets/smile-3d.svg";
import SurpriseEmoticon from "@/features/post/assets/surprise.svg";
import SurpriseAnimEmoticon from "@/features/post/assets/surprise-anim.webp";

export const POST_REACTIONS = {
  happy: {
    imageUrl: HappyEmoticon,
    animationUrl: HappyAnimEmoticon,
  },
  sad: {
    imageUrl: SadEmoticon,
    animationUrl: SadAnimEmoticon,
  },
  surprise: {
    imageUrl: SurpriseEmoticon,
    animationUrl: SurpriseAnimEmoticon,
  },
  angry: {
    imageUrl: AngryEmoticon,
    animationUrl: AngryAnimEmoticon,
  },
  handsome: {
    imageUrl: HandsomeEmoticon,
    animationUrl: HandsomeAnimEmoticon,
  },
} as const;

export const POST_EMOTIONS = {
  smile: {
    imageUrl: SmileEmoticon,
    label: "기쁨",
    color: "bg-yellow-500",
  },
  astonish: {
    imageUrl: AstonishEmoticon,
    label: "당황",
    color: "bg-orange-500",
  },
  cry: {
    imageUrl: CryEmoticon,
    label: "슬픔",
    color: "bg-blue-500",
  },
  anxious: {
    imageUrl: AnxiousEmoticon,
    label: "걱정",
    color: "bg-violet-500",
  },
  rage: {
    imageUrl: RageEmoticon,
    label: "분노",
    color: "bg-red-500",
  },
  calm: {
    imageUrl: CalmEmoticon,
    label: "덤덤",
    color: "bg-lime-500",
  },
} as const;

export type POST_REACTION_TYPE = keyof typeof POST_REACTIONS;

export type POST_EMOTION_TYPE = keyof typeof POST_EMOTIONS;

export interface PostCreateFormData {
  location: naver.maps.LatLng | null;
  emotion: POST_EMOTION_TYPE | null;
  message: string;
}
