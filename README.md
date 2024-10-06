# Carbin-Fantasty
## Full-stack for learning Next.js, Prisma, MongoDB and for more information please wait for a while and welcome pull requests

### MongoDB Design
- User: Stores basic user information, including username, email, avatar, password, etc. A user can have multiple third-party OAuth accounts, multiple listings, and multiple reservations.
- Account: Stores third-party OAuth information, such as GitHub OAuth. Each account is associated with a user and includes OAuth provider, account type, access token, etc.
- Listing: Stores listing information, including title, description, image, category, room count, bathroom count, guest count, location, price, etc. Each listing is associated with a user and can have multiple reservations.
- Reservation: Stores reservation information, including user ID, listing ID, start date, end date, total price, etc. Each reservation is associated with a user and a listing.

