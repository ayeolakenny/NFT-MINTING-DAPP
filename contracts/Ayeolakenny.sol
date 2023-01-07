// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Ayeolakenny is ERC721Enumerable, Ownable {
    using Strings for uint256;

    string baseURI;
    string imagesBaseURI;
    string public baseImage = ".webp";
    string public baseExtension = ".json";
    uint256 public cost = 0.001 ether;
    uint256 public maxSupply = 99;
    bool public paused = false;

    event Sale(
        uint256 id,
        address indexed buyer,
        uint256 cost,
        string indexed tokenURI,
        uint256 timestamp
    );

    struct SaleStruct {
        uint256 id;
        address buyer;
        uint256 cost;
        string imageURL;
        uint256 timestamp;
    }

    SaleStruct[] minted;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _initialBaseURI, // for the nft metadata
        string memory _initialImagesBaseURI // for the nft images
    ) ERC721(_name, _symbol) {
        setBaseURI(_initialBaseURI);
        setImagesBaseURI(_initialImagesBaseURI);
    }

    function payToMint() public payable {
        // Total supply is coming from ERC721 contract above;
        // totalSupply() Gives you the total number of nft minted in the contract
        uint256 supply = totalSupply();
        require(!paused, "Nfts under mentainance!");
        require(supply <= maxSupply, "Sorry, all NFTs have been minted");
        require(msg.value > 0 ether, "Ether too low for minting");

        // Owner coming from the Ownable contract above
        if (msg.sender != owner()) {
            require(msg.value >= cost, "Please top up ethers");
        }

        //  _safemint frim ERC721 from above
        _safeMint(msg.sender, supply + 1);

        minted.push(
            SaleStruct(
                supply + 1,
                msg.sender,
                msg.value,
                toImage(supply + 1),
                block.timestamp
            )
        );

        emit Sale(
            supply + 1,
            msg.sender,
            msg.value,
            tokenURI(supply + 1),
            block.timestamp
        );
    }

    // Converts a tokenId to an image
    function toImage(uint256 tokenId) internal view returns (string memory) {
        string memory currentBaseURI = imagesBaseURI;
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        baseImage
                    )
                )
                : "";
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        baseExtension
                    )
                )
                : "";
    }

    function getAllNFTs() public view returns (SaleStruct[] memory) {
        return minted;
    }

    function getAnNfts(
        uint256 tokenId
    ) public view returns (SaleStruct memory) {
        return minted[tokenId - 1];
    }

    function payTo(address to, uint256 amount) public onlyOwner {
        (bool success1, ) = payable(to).call{value: amount}("");
        require(success1);
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setImageBaseURI(string memory _newImageBaseURI) public onlyOwner {
        imagesBaseURI = _newImageBaseURI;
    }

    function setImagesBaseURI(
        string memory _newImagesBaseURI
    ) public onlyOwner {
        imagesBaseURI = _newImagesBaseURI;
    }

    function setPause(bool _state) public onlyOwner {
        paused = _state;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }
}
