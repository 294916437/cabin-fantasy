import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import React from "react";
import getCurrentUser from "@/service/actions/getCurrentUser";
import getFavoriteListings from "@/service/actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";

type Props = {};

const FavoritePage = async (props: Props) => {
	const [currentUser, listings] = await Promise.all([getCurrentUser(), getFavoriteListings()]);

	if (!currentUser) {
		return (
			<ClientOnly>
				<EmptyState title='Unauthorized' subtitle='Please login' />
			</ClientOnly>
		);
	}

	if (listings.length === 0) {
		return (
			<ClientOnly>
				<EmptyState
					title='No favorites found'
					subtitle='Looks like you have no favorite listings.'
				/>
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<FavoritesClient listings={listings} currentUser={currentUser} />
		</ClientOnly>
	);
};

export default FavoritePage;
