pragma solidity ^0.5.8;

contract Authentication {

    struct BTdata {
        string bt_id;
        uint256 timestamps; 
    }
    
    struct User {
        bool covidStatus;
        uint BTcount;
        string check;
    } 
//    12->{
//        0->16
//        1->14
//        2->18
//         }
//    13->{}
    uint public userCount;

    mapping(string => User) public users;
    mapping(string => mapping(uint => BTdata)) public BTdatas;

    function Register(string memory B_ID, bool status) public{
        BTdatas[B_ID];
        users[B_ID].covidStatus = status;
        users[B_ID].check = "registered";
        userCount++ ;
    }

    function removeUser(string memory B_ID) public{
        delete(users[B_ID]);
        for(uint i=0;i<users[B_ID].BTcount;i++){
            delete(BTdatas[B_ID][i]);
        }
    }

    function update_BID(string memory oldB_ID, string memory newB_ID) public{
        users[newB_ID]=users[oldB_ID];
        delete(users[oldB_ID]);
        
        for(uint i=0; i<users[newB_ID].BTcount;i++){
            BTdatas[newB_ID][i]=BTdatas[oldB_ID][i];
            delete(BTdatas[oldB_ID][i]); }
    }
    
    function update_status(string memory B_ID, bool status) public{
        users[B_ID].covidStatus= status;
    }

    function updateBData(string memory B_Id, string memory btids, uint256 timestamps) public{    
        BTdatas[B_Id][users[B_Id].BTcount].bt_id=btids;
        BTdatas[B_Id][users[B_Id].BTcount].timestamps=timestamps;
        users[B_Id].BTcount++;  
    }
    // function getBtData(){
        
    // } 

}