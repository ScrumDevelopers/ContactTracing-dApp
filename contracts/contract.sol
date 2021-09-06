pragma solidity ^0.5.8;

contract IM{
    struct User{
        string uid;
        string name;
        string email;
    }
    struct docStruct {
        string docid;
    }
    mapping(string => User) public users;
    mapping(string => mapping(uint => docStruct)) public docsData;
    uint public userCount;

    function Register() public{
    }

    function saveDocId() public{
    }

}