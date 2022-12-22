const { inputToConfig } = require("@ethereum-waffle/compiler")
const { assert } = require("chai")
const { network, getNamedAccounts, deployments, ethers } = require("hardhat")

const { developmentChains, networkConfig } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Raffle Unit Tests", async function () {
          let raffle, vrfCoordinatorV2Mock //the things we need to deploys
          const chainId = network.config.chainId

          beforeEach(async function () {
              const { deployer } = await getNamedAccounts()
              await deployments.fixture(["all"]) //we are going to deploy the files which inclues "all" tag
              raffle = await ethers.getContract("Raffle", deployer) //we are going to get the raffle connect it with the deployer
              vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock", deployer) //same way mentioned above
          })

          describe("constructor", async function () {
              it("Initializes the raffle correctly", async function () {
                  //Ideally we make our test have just one assert per "it"
                  const raffleState = await raffle.getRaffleState()
                  const interval = await raffle.getInterval()
                  assert.equal(raffleState.toString(), "0") //we will get the raffle state in string otherwise it will turn into a uint256 as it will return 0/1
                  assert.equal(interval.toString(), networkConfig[chainId]["interval"]) //we are getting "interval" from chainId from helper hardhat config
              })
          })
      })
