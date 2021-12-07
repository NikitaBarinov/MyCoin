pragma solidity ^0.8.0;

contract Token{
    address public owner;
    string public name;
    string public symbol;
    uint256 public totalSupply_;
    uint8 public decimals;
    
    mapping (address => uint256) public balances;

    mapping (address => mapping(address => uint256)) allowed;

    
    constructor() public {
        owner = msg.sender;
        name = "Sezam";
        symbol = "SZM";
        decimals = 18;
        totalSupply_ = 1000;
        balances[owner] = totalSupply_;
    }

    function totalSupply() view public returns (uint256){
        return totalSupply_;
    }

    function balanceOf(address _owner) view public returns(uint256){
        return balances[_owner];
    }

    function transfer(address _to, uint256 _value) public returns (bool){
        require(balances[msg.sender] <= _value);
            address _from = msg.sender;
            
            balances[_from] = balances[_from] - _value;
            balances[_to] = balances[_to] + _value;
            
            emit Transfer(_from, _to, _value);
            return true;
    }

    function transferFrom(address _from, address _to,
        uint _value) public returns (bool){
            require(_value <= balances[_from]);
            require(_value <= allowed[_from][msg.sender]);
            
            balances[_from] = balances[_from] - _value;
            allowed[_from][msg.sender] = allowed[_from][msg.sender] - _value;
            balances[_to] = balances[_to] + _value;
            
            emit Transfer(_from, _to, _value);
            
            return true;
    }

    function approve(address _spender, uint _value) public returns (bool){
        allowed[msg.sender][_spender] += _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance (address _owner, address _spender) public view returns(uint){
        return allowed[_owner][_spender];
    }

    event Approval(address indexed tokenOwner, address indexed spender,
     uint tokens);
    event Transfer(address indexed _from, address indexed _to,
     uint256 _value);

}