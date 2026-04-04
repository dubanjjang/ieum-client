import AngryEmoticon from "@/entities/post/assets/angry.svg";
import AngryAnimEmoticon from "@/entities/post/assets/angry-anim.webp";
import AnxiousEmoticon from "@/entities/post/assets/anxious-3d.svg";
import AstonishEmoticon from "@/entities/post/assets/astonish-3d.svg";
import CalmEmoticon from "@/entities/post/assets/calm-3d.svg";
import CryEmoticon from "@/entities/post/assets/cry-3d.svg";
import HandsomeEmoticon from "@/entities/post/assets/handsome.svg";
import HandsomeAnimEmoticon from "@/entities/post/assets/handsome-anim.webp";
import HappyEmoticon from "@/entities/post/assets/happy.svg";
import HappyAnimEmoticon from "@/entities/post/assets/happy-anim.webp";
import RageEmoticon from "@/entities/post/assets/rage-3d.svg";
import SadEmoticon from "@/entities/post/assets/sad.svg";
import SadAnimEmoticon from "@/entities/post/assets/sad-anim.webp";
import SmileEmoticon from "@/entities/post/assets/smile-3d.svg";
import SurpriseEmoticon from "@/entities/post/assets/surprise.svg";
import SurpriseAnimEmoticon from "@/entities/post/assets/surprise-anim.webp";

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
    color: ["#FFAA50", "#EAB308", "#50D060"],
  },
  astonish: {
    imageUrl: AstonishEmoticon,
    label: "당황",
    color: ["#FF6BB5", "#C85A10", "#E8305B"],
  },
  cry: {
    imageUrl: CryEmoticon,
    label: "슬픔",
    color: ["#56E8C0", "#1E5ABF", "#7B3BF6"],
  },
  anxious: {
    imageUrl: AnxiousEmoticon,
    label: "걱정",
    color: ["#FF6BB5", "#6A3AC0", "#3B6BF6"],
  },
  rage: {
    imageUrl: RageEmoticon,
    label: "분노",
    color: ["#FF8050", "#E53E3E", "#8B0020"],
  },
  calm: {
    imageUrl: CalmEmoticon,
    label: "덤덤",
    color: ["#40E0A0", "#2E8B57", "#1A6040"],
  },
} as const;

export type POST_REACTION_TYPE = keyof typeof POST_REACTIONS;

export type POST_EMOTION_TYPE = keyof typeof POST_EMOTIONS;

export interface PostCreateFormData {
  location: naver.maps.LatLng | null;
  emotion: POST_EMOTION_TYPE | null;
  message: string;
}
