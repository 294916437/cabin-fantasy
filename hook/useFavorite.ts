import { SafeUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import useLoginModel from "./useLoginModal";

type Props = {
  listingId: string;
  currentUser?: SafeUser | null;
};

function useFavorite({ listingId, currentUser }: Props) {
  const router = useRouter();
  const loginModel = useLoginModel();

  const hasFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModel.onOpen();
      }

      try {
        let request;

        if (hasFavorite) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
          toast.success("Dislike it");
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
          toast.success("Favorite it");
        }

        await request();
        router.refresh();
        
      } catch (error: any) {
        toast.error("Something Went Wrong");
      }
    },
    [currentUser, hasFavorite, listingId, loginModel]
  );

  return {
    hasFavorite,
    toggleFavorite,
  };
}

export default useFavorite;
