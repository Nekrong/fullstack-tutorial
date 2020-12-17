import React, { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import Button from '../components/button';
import { cartItemsVar } from '../cache';
import * as GetCartItemsTypes from '../pages/__generated__/GetCartItems';
import * as BookTripsTypes from './__generated__/BookTrips';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import Card from '../components/card property/Card';

export const BOOK_TRIPS = gql`
  mutation BookTrips($launchIds: [ID]!, $payToken: String) {
    bookTrips(launchIds: $launchIds, paymentToken: $payToken) {
      launches {
        mission{
          name
        }
      }
      message
      charge{
        amount
        currency
        status
      }
    }
  }
`;

interface BookTripsProps extends GetCartItemsTypes.GetCartItems {}

const BookTrips: React.FC<BookTripsProps> = ({ cartItems }) => {

    const stripe = useStripe()
    const elements = useElements();
    const [token, setToken] = useState('')

    const handleSubmit= async(event:any)=>{
        event.preventDefault();


        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        let result:any;

        card ? result = await stripe.createToken(card)
            : console.log("card undefined");

        if (result.error) {
            console.log(result.error)
        } else if(result.token){
            setToken(result.token.id);
        }




    }
    useEffect(()=>{
        if(token){
            bookTrips();
            cartItemsVar([]);
        }
    },[token])

    const [bookTrips, { data }] = useMutation<
        BookTripsTypes.BookTrips,
        BookTripsTypes.BookTripsVariables
        >(
        BOOK_TRIPS,
        {
            variables: { launchIds: cartItems,  payToken: token},
        }
    );

    return data && data.bookTrips && data.bookTrips.charge?.status
        ? <p data-testid="message">{data.bookTrips.message}</p>
        : <>
            <form onSubmit={async (event) => await  handleSubmit(event)}>
                <Card />

                <Button
                    disabled={!stripe}
                    type="submit"
                    data-testid="book-button"
                >
                    Book All
                </Button>
            </form>
        </>
}

export default BookTrips;

