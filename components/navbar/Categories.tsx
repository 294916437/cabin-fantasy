"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { BsSnow } from "react-icons/bs";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiForestCamp,
  GiIsland,
  GiWindmill,
  GiFarmTractor,
  GiMountains ,
  GiNightSky 
} from "react-icons/gi";
import { FaWineBottle } from "react-icons/fa";
import { MdOutlineVilla,MdOutlineForest  } from "react-icons/md";
import { TbBeach, TbPool } from "react-icons/tb";
import CategoryBox from "../CategoryBox";
import Container from "../Container";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmill",
    icon: GiWindmill,
    description: "This property has windmills!",
  },
  {
    label: "Urban",
    icon: MdOutlineVilla,
    description: "This property is in an urban area!",
  },
  {
    label: "River",
    icon: TbPool,
    description: "This property is near a river!",
  },
  {
    label: "Forest",
    icon: MdOutlineForest,
    description: "This property is in a forest!",
  },
  {
    label: "Mountain",
    icon: GiMountains,
    description: "This property is in the mountain!",
  },
  {
    label: "Island",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is near a lake!",
  },
 
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property offers camping activities!",
  },
  {
    label: "Star",
    icon: GiNightSky,
    description: "This property offers starry nights!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property is in arctic environment!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the desert!",
  },
  {
    label: "Barn",
    icon: GiBarn,
    description: "This property is around the barn!",
  },
  {
    label: "Farm",
    icon: GiFarmTractor,
    description: "This property is around the farm!",
  },
  {
    label: "Vineyard",
    icon: FaWineBottle,
    description: "This property is in a vineyard!",
  },
];

type Props = {};

function Categories({}: Props) {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex items-center justify-between overflow-hidden">
        {categories.map((items, index) => (
          <CategoryBox
            key={index}
            icon={items.icon}
            label={items.label}
            selected={category === items.label}
          />
        ))}
      </div>
    </Container>
  );
}

export default Categories;
