const serverUrl = "https://1wofpfsogyv7.usemoralis.com:2053/server";
const appId = "b2mfGFPIMDXOgVYmHyS6xYeEO4GCdqxXYX6PXSMF";
const contract_address = "0xf68b945b1fc366db57163810778d8bf1729851ef";
Moralis.start({ serverUrl, appId });
let web3;

async function init(){
    let currentUser = Moralis.User.current();
    if(!currentUser){
        window.location.pathname = "/index.html";
    }

    web3 = await Moralis.Web3.enable();
    let accounts = await web3.eth.getAccounts();
    

    const urlParams = new URLSearchParams(window.location.search);
    const nftId = urlParams.get("nftId");
    document.getElementById("token_id_input").value = nftId;
    document.getElementById("address_input").value = accounts[0];
}
 
async function mint(){
    let tokenId = parseInt(document.getElementById("token_id_input").value);
    let address = document.getElementById("address_input").value;
    let amount = parseInt(document.getElementById("amount_input").value);

    let accounts = await web3.eth.getAccounts();
    const contract = new web3.eth.Contract(contractABI, contract_address);
    contract.methods.mint(address, tokenId, amount).send({from: accounts[0], value: 0})
    .on("receipt", function(receipt) {
        alert("Mint done!");
    })
}

document.getElementById("submit_mint").onclick = mint;

init();