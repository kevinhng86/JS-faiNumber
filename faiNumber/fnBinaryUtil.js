"use strict";
/*
 * Copyright 2019 Khang Hoang Nguyen
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files
 * (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
 * BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 **/
/* 
 * Only include when not yet include, or if previous include(s) had a
 * lower file version.
 **/
if ( !fnBinaryUtil || (fnBinaryUtil && fnBinaryUtil.fileversion < 1) ){

/** 
 * <p>The <code>fnBinaryUtil</code> namespace is a namespace that provides
 * functions for converting binary integer strings to values of 
 * <code>number</code> type. Functions of this namespace treat binary 
 * strings as strings of binary digits that represent bit values. Thus,
 * binary strings are treated by this function as unsigned values. Use the
 * {@link fnBase2Util fnBase2Util} namespace's functions for
 * unsigned/signed base 2 integer numbers.
 *
 * <p>To use this API alone by itself, include fnBinaryUtil.js. Otherwise,
 * include faiNumber-include-all.js.
 * 
 * <p>This namespace API provides the function 
 * {@link fnBinaryUtil.toNumber toNumber} that can parse unsigned
 * binary integer strings to values of number type.
 * 
 * <p>This namespace API also provides functions for comparing unsigned 
 * binary integer strings pertain to the mathematical aspect.
 * The {@link fnBinaryUtil.compareAsNumber compareAsNumber} of this 
 * namespace API can compare strings by their actual number values when
 * the strings are valid binary integer strings that can be parsed to
 * number values.
 *
 * <p>Strings can also be compared using the
 * {@link fnBinaryUtil.numberOrSmaller numberOrSmaller} method,
 * of which compares the strings bases on their content reference to
 * number values.</p>
 *
 * @author  Khang Hoang Nguyen
 *
 * @since  1.0.0.f
 *
 * @namespace
 **/
var fnBinaryUtil = {};

/** File version number. **/
fnBinaryUtil.fileversion = 1;

/**
 * Parse the input string as a string of unsigned binary integer to a
 * value of type number.
 *
 * @param  {string} input
 *         A string to be parsed as an unsigned binary integer number
 *         to a value of type number.
 *
 * @return  {number} A value of type number of the <code>input</code>
 *          string if the <code>input</code> string is a valid unsigned
 *          binary integer string.
 * 
 * @return  {undefined} <p>A value of undefined is returned if the
 *          <code>input</code> string is not a valid unsigned binary 
 *          integer string. Undefined is also returned where the 
 *          <code>input</code> string is empty.
 * 
 *          <p>Parsing a value that is larger than the value of
 *          Number.MAX_SAFE_INTEGER(9007199254740991) will yield an
 *          undefined value.</p>
 * 
 * @throws  {string} "Not a string"
 *          if the <code>input</code> is not of string type.
 *
 * @since  1.0.0.f
 **/
fnBinaryUtil.toNumber = function(input){
    if ( typeof input !== "string" ) throw "Not a string";

    var length = input.length;
    if ( length === 0 ) return;
    var start = 0;
    
    var out = 0, c;
    while ( start < length && input.charCodeAt(start) === 48 ) start++;
    if ( length - start > 53 ) return;

    for ( ; start < length; start++){
        c = input.charCodeAt(start) ^ 48;
        if ( c > 1 ) return;
        out = (out * 2) + c;
    }

    return out;
}

/**
 * <p>Compare two strings as unsigned binary integer strings by parsing them
 * to type number values first.
 * 
 * <p>Take note that comparing strings with values larger than 
 * Number.MAX_SAFE_INTEGER will yield an undefined value.
 *
 * <p>This function does not throw errors. However, the
 * {@link fnBinaryUtil.toNumber toNumber} function uses by this function
 * throws error.</p>
 *
 * @param  {string} firstNumber
 *         A string to be compared to the string <code>secondNumber</code>.
 *
 * @param  {string} secondNumber
 *         A string to be compared to the string <code>firstNumber</code>.
 *
 * @return  {string} A value of 1 if the <code>firstNumber</code> string
 *          is larger than the <code>secondNumber</code> string, 0 if
 *          they are both equal, or -1 if the <code>firstNumber</code>
 *          string is smaller than the <code>secondNumber</code> string. 
 *
 * @return  {undefined} If parsing either one of the input strings
 *          yielded an undefined value, an undefined value is returned.
 * 
 * @see  {@link fnBinaryUtil.toNumber toNumber}
 *
 * @since  1.0.0.f
 **/
fnBinaryUtil.compareAsNumber = function(firstNumber, secondNumber){
    var n1 = this.toNumber(firstNumber),
        n2 = this.toNumber(secondNumber);
    
    if ( n1 === undefined || n2 === undefined ) return;

    if ( n1 > n2 ) return 1;
    else if ( n1 < n2 ) return -1;
    return 0;
}

/**
 * <p>Compare two strings bases on the content of the strings reference
 * to type number. If the strings are valid unsigned binary integer
 * strings that can be parsed to type number values then they will be
 * compared base on their number values. Otherwise, the strings will be
 * compared base on the priority ranking order below.
 * 
 * <p>Take note that this method treats strings with values larger than 
 * Number.MAX_SAFE_INTEGER as undefined.
 * 
 * <p>This function does not throw errors. However, the 
 * {@link fnBinaryUtil.toNumber toNumber} ultilizes by this function
 * throws error.
 *
 * <p>Priority order ranking: (lo - hi)</br>
 * 0 - Undefined(NaN/Not a safe value)</br>
 * 1 - Empty strings</br>
 * 2 - Valid number values in range of MIN_SAFE_INTEGER and MAX_SAFE_INTEGER</p>
 *
 * @param  {string} firstNumber
 *         A string to be compared to the string <code>secondNumber</code>.
 *
 * @param  {string} secondNumber
 *         A string to be compared to the string <code>firstNumber</code>.
 *
 * @return  {number} A value of 1 if the <code>firstNumber</code> string
 *          is larger than the <code>secondNumber</code> string, 0 if
 *          they are both equal, or -1 if the <code>firstNumber</code>
 *          string is smaller than the <code>secondNumber</code> string. 
 *
 * @see  {@link fnBinaryUtil.toNumber toNumber}
 * 
 * @since  1.0.0.f
 **/
fnBinaryUtil.numberOrSmaller = function(firstNumber, secondNumber){
    var n1 = this.toNumber(firstNumber),
        n2 = this.toNumber(secondNumber);

    if ( firstNumber.length === 0 ){
        if ( secondNumber.length === 0 ) return 0;
      
        if ( n2 !== undefined ) return -1;
        else return 1;
    } else if ( secondNumber.length === 0 ){
        if ( n1 !== undefined ) return 1;
        else return -1;
    }

    if ( n1 === undefined ){
        if ( n2 === undefined ) return 0;
        else return -1;
    } else if ( n2 === undefined ) return 1;

    if ( n1 > n2 ) return 1;
    else if ( n1 < n2 ) return -1;
    return 0;
}

Object.freeze(fnBinaryUtil);

} // <-- Declaring if needed

(function () {
    if (typeof module !== 'undefined' && module.exports) module.exports = fnBinaryUtil;
})();
