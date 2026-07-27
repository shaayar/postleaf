import { IconType } from "react-icons";

import { HiOutlineRocketLaunch, HiOutlineArrowRightStartOnRectangle, HiOutlineCog6Tooth, HiOutlineBookOpen, HiOutlineArchiveBoxArrowDown, HiOutlineUserGroup } from "react-icons/hi2";
import { FaGithub, FaDiscord, FaThreads, FaLinkedinIn, FaArrowRight, FaInstagram,  FaStar } from "react-icons/fa6";
import { CiEdit, CiLock, CiMail } from "react-icons/ci";
import { IoHeartOutline, IoHomeOutline, IoSparklesOutline } from "react-icons/io5";
import { HiOutlineGlobeAlt } from "react-icons/hi";

export const iconLibrary: Record<string, IconType> = {
  rocket: HiOutlineRocketLaunch,
  logout: HiOutlineArrowRightStartOnRectangle,
  settings: HiOutlineCog6Tooth,
  github: FaGithub,
  discord: FaDiscord,
  threads: FaThreads,
  book: HiOutlineBookOpen,
  edit: CiEdit,
  home: IoHomeOutline,
  group: HiOutlineUserGroup,
  lock: CiLock,
  linkedin: FaLinkedinIn,
  arrowRight: FaArrowRight,
  instagram: FaInstagram,
  heart: IoHeartOutline,
  star: FaStar,
  globe: HiOutlineGlobeAlt,
  archive: HiOutlineArchiveBoxArrowDown,
  sparkles: IoSparklesOutline,
  mail: CiMail
};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;