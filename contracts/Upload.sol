// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Upload {
  
  struct AccessStruct{
     address user; 
     bool access; //true or false
  }
  mapping(address=>string[]) dataChunks;
  mapping(address=>mapping(address=>bool)) accessMap; // access  accessMap[u1][u2] : access of content of u1 to u2
  mapping(address=>AccessStruct[]) allowedUserArr;           // map maintained by owner to keep track of their authorised user list
  mapping(address=>mapping(address=>bool)) oneTimeMap;  // oneTimeMap[u1][u2] : check if access already given to u2 by u1

  function add(address _user,string memory url) external {
      dataChunks[_user].push(url);
  }
  function allow(address user) external {//def
      accessMap[msg.sender][user]=true; 
      if(oneTimeMap[msg.sender][user]){
         for(uint i=0;i<allowedUserArr[msg.sender].length;i++){
             if(allowedUserArr[msg.sender][i].user==user){
                  allowedUserArr[msg.sender][i].access=true; 
             }
         }
      }else{
          allowedUserArr[msg.sender].push(AccessStruct(user,true));  
          oneTimeMap[msg.sender][user]=true;  
      }
    
  }
  function disallow(address user) public{
      accessMap[msg.sender][user]=false;
      for(uint i=0;i<allowedUserArr[msg.sender].length;i++){
          if(allowedUserArr[msg.sender][i].user==user){ 
              allowedUserArr[msg.sender][i].access=false;  
          }
      }
  }

  function display(address _user) external view returns(string[] memory){
      require(_user==msg.sender || accessMap[_user][msg.sender],"You don't have access");
      return dataChunks[_user];
  }

  function shareAccess() public view returns(AccessStruct[] memory){
      return allowedUserArr[msg.sender];
  }
}