# Carbin-Fantasty
## Full-stack for learning Next.js, Prisma, MongoDB and for more information please wait for a while and welcome pull requests

### MongoDB Design
- User: Stores basic user information, including username, email, avatar, password, etc. A user can have multiple third-party OAuth accounts, multiple listings, and multiple reservations.
- Account: Stores third-party OAuth information, such as GitHub OAuth. Each account is associated with a user and includes OAuth provider, account type, access token, etc.
- Listing: Stores listing information, including title, description, image, category, room count, bathroom count, guest count, location, price, etc. Each listing is associated with a user and can have multiple reservations.
- Reservation: Stores reservation information, including user ID, listing ID, start date, end date, total price, etc. Each reservation is associated with a user and a listing.

### Data Model Design

#### User Model
- `id`: The unique identifier for the user, automatically generated ObjectId.
- `name`: The username.
- `email`: The user's email, unique.
- `emailVerified`: The email verification time.
- `image`: The user's avatar.
- `hashedPassword`: The hashed password of the user.
- `createdAt`: The creation time of the user, default to the current time.
- `updatedAt`: The update time of the user, automatically updated.
- `favoriteIds`: The list of favorite listing IDs of the user.
- `accounts`: The list of third-party OAuth accounts associated with the user.
- `listings`: The list of listings posted by the user.
- `reservations`: The list of reservations made by the user.

#### Account Model
- `id`: The unique identifier for the account, automatically generated ObjectId.
- `userId`: The ID of the associated user.
- `type`: The account type.
- `provider`: The OAuth provider.
- `providerAccountId`: The provider account ID.
- `refresh_token`: The refresh token.
- `access_token`: The access token.
- `expires_at`: The expiration time of the token.
- `token_type`: The type of the token.
- `scope`: The scope of the token.
- `id_token`: The ID token.
- `session_state`: The session state.
- `user`: The associated user.

#### Listing Model
- `id`: The unique identifier for the listing, automatically generated ObjectId.
- `title`: The title of the listing.
- `description`: The description of the listing.
- `imageSrc`: The image URL of the listing.
- `createdAt`: The creation time of the listing, default to the current time.
- `category`: The category of the listing.
- `roomCount`: The number of rooms in the listing.
- `bathroomCount`: The number of bathrooms in the listing.
- `guestCount`: The number of guests the listing can accommodate.
- `locationValue`: The location of the listing.
- `userId`: The ID of the user who posted the listing.
- `price`: The price of the listing.
- `user`: The associated user.
- `reservations`: The list of reservations for the listing.

#### Reservation Model
- `id`: The unique identifier for the reservation, automatically generated ObjectId.
- `userId`: The ID of the user who made the reservation.
- `listingId`: The ID of the reserved listing.
- `startDate`: The start date of the reservation.
- `endDate`: The end date of the reservation.
- `totalPrice`: The total price of the reservation.
- `createdAt`: The creation time of the reservation, default to the current time.
- `user`: The associated user.
- `listing`: The associated listing.