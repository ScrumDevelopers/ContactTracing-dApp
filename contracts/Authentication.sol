pragma solidity >=0.4.21 <0.7.0;

contract Authentication {
    uint private imei;
    bytes32 public imeiHash;
    bytes32 public Hash;
    struct User {
        bytes32 imeiHash;
        uint currentLocation;
        bool covidStatus; 
    }
    uint public userCount;
    mapping(uint => User) public users;

    function Register(uint _phnID,uint location, bool status) public{
        imei = _phnID;
        imeiHash = sha256(abi.encode(imei));
        userCount++ ;
        users[userCount] = User(imeiHash,location,status);
    }

    function removeUser(uint _phnID) public{
        imei = _phnID;
        Hash = sha256(abi.encode(imei));
        for(uint i=0;i<userCount;i++){
            if (users[i].imeiHash==Hash){
                delete(users[i]);
            }            
        }
    }
    
}