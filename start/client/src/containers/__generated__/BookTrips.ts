/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: BookTrips
// ====================================================

export interface BookTrips_bookTrips_launches {
  __typename: "Launch";
  id: string;
  isBooked: boolean;
}

export interface BookTrips_bookTrips {
  __typename: "TripUpdateResponse";
  success: boolean;
  message: string | null;
  launches: (BookTrips_bookTrips_launches | null)[] | null;
  charge: BookTrips_bookTrips_charge| null;
}

export interface BookTrips_bookTrips_charge {
  __typename: "Charge";
  amount: Number
  currency: ChargeCurrency
  status: ChargeStatus
}

enum ChargeCurrency{
  usd
}

enum ChargeStatus {
  succeeded,
  pending,
  failed
}

export interface BookTrips {
  bookTrips: BookTrips_bookTrips;
}

export interface BookTripsVariables {
  launchIds: (string | null)[];
  payToken: string | null;
}
