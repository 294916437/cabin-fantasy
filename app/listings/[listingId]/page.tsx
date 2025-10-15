import getCurrentUser from "@/service/actions/getCurrentUser";
import getListingById from "@/service/actions/getListingById";
import getReservation from "@/service/actions/getReservations";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import ListingClient from "@/components/ListingClient";

interface IParams {
	listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
	const [listing, reservations, currentUser] = await Promise.all([
		getListingById(params),
		getReservation(params),
		getCurrentUser(),
	]);

	if (!listing) {
		return (
			<ClientOnly>
				<EmptyState />
			</ClientOnly>
		);
	}

	return (
		<ClientOnly>
			<ListingClient listing={listing} currentUser={currentUser} reservations={reservations} />
		</ClientOnly>
	);
};

export default ListingPage;
