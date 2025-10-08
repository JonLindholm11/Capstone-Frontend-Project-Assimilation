import React from 'react';
import { useEffect, useState } from 'react';

function SpecialPricing() {
    const [prices, setPrices] = useState([]);
    const [formData, setFormData] = useState({
        productName: '',
        regularPrice: '',
        validPrice: '',
        validDate: ''
    });
};


