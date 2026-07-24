import { IconType } from "react-icons";

import { HiOutlineRocketLaunch, HiOutlineArrowRightStartOnRectangle, HiOutlineCog6Tooth, HiOutlineBookOpen, } from "react-icons/hi2";
import { FaGithub, FaDiscord, FaThreads, FaLinkedinIn, FaArrowRight, FaInstagram } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { IoHome } from "react-icons/io5";
import { TiGroup } from "react-icons/ti";
import { FaLock } from "react-icons/fa";

export const iconLibrary: Record<string, IconType> = {
  rocket: HiOutlineRocketLaunch,
  logout: HiOutlineArrowRightStartOnRectangle,
  settings: HiOutlineCog6Tooth,
  github: FaGithub,
  discord: FaDiscord,
  threads: FaThreads,
  book: HiOutlineBookOpen,
  edit: CiEdit,
  home: IoHome,
  group: TiGroup,
  lock: FaLock,
  linkedin: FaLinkedinIn,
  arrowRight: FaArrowRight,
  instagram: FaInstagram,
};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;