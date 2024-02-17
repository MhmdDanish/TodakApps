// StarRating.js
import React from 'react';
import { View } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

const StarRating = ({ rating }) => {
  return (
    <View>
      <AirbnbRating
        count={5}
        defaultRating={rating}
        showRating={false}
        size={20}
        isDisabled
      />
    </View>
  );
};

export default StarRating;
