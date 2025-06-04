export type GfxStakeRewardsProgramTypes = {
  "version": "0.1.0",
  "name": "gfx_stake_rewards",
  "docs": [
    "See this module for instruction documentation."
  ],
  "instructions": [
    {
      "name": "initializeGlobalAccounts",
      "docs": [
        "Initialize global accounts"
      ],
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payerGofx",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gofxVaultSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "gofxUnstakedSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "usdcFeeSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "usdcRewardSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "gofxVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "This instruction initializes the token account",
            "required for storing staked GOFX."
          ]
        },
        {
          "name": "usdcRewardVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "This instruction initializes the token account",
            "required for storing USDC rewards."
          ]
        },
        {
          "name": "gofxUnstakedVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "This instruction initializes the token account",
            "required for storing unstaked GOFX before it is reclaimed."
          ]
        },
        {
          "name": "usdcFeeVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "This instruction initializes the token account",
            "required for storing USDC fees collected for distribution."
          ]
        },
        {
          "name": "gofxMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Needed for account initialization"
          ]
        },
        {
          "name": "usdcMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Needed for account initialization"
          ]
        },
        {
          "name": "stakePool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "This instruction initializes the global account struct that stores",
            "staking information."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initializeUserAccount",
      "docs": [
        "Initialize user accounts"
      ],
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "This address will be the owner of the user metadata account being initialized."
          ]
        },
        {
          "name": "funder",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "This field allows a separate funder for the rent-exempt balance",
            "of the accounts being initialized here."
          ]
        },
        {
          "name": "stakePool",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Global state"
          ]
        },
        {
          "name": "usdcMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userMetadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "User metadata account being initialized"
          ]
        },
        {
          "name": "userRewardsHoldingAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "User's reward are escrowed at TokenAccount of their UserMetadata"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "crank",
      "docs": [
        "Crank"
      ],
      "accounts": [
        {
          "name": "stakePool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Global state"
          ]
        },
        {
          "name": "usdcFeeVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "In the SSL swap CPI, this is user_out_ata"
          ]
        },
        {
          "name": "usdcRewardVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "USDC reward account, fees distribute from here."
          ]
        },
        {
          "name": "usdcFeeSigner",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "that swaps an arbitrary token for USDC."
          ]
        },
        {
          "name": "gfxSslProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The swap CPI calls this program"
          ]
        },
        {
          "name": "controller",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sslIn",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sslOut",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "liabilityVaultIn",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "swappedLiabilityVaultIn",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "liabilityVaultOut",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "swappedLiabilityVaultOut",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userInAta",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "This must be a USDC token account owned by the [FeesCollected] PDA."
          ]
        },
        {
          "name": "feeCollectorAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userWallet",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "feeCollector",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "minOut",
          "type": "u64"
        }
      ]
    },
    {
      "name": "crankV2Single",
      "accounts": [
        {
          "name": "stakePool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Global state"
          ]
        },
        {
          "name": "usdcFeeVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "In the Gamma swap CPI, this is user_out_ata"
          ]
        },
        {
          "name": "usdcRewardVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "USDC reward account, fees distribute from here."
          ]
        },
        {
          "name": "usdcFeeSigner",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "that swaps an arbitrary token for USDC."
          ]
        },
        {
          "name": "gfxAmmProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The swap CPI calls this program"
          ]
        },
        {
          "name": "ammAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammPoolState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammObservationState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammInputVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammOutputVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inputTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "outputTokenMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "USDC mint"
          ]
        },
        {
          "name": "userInAta",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "This must be a token account owned by the [FeesCollected] PDA."
          ]
        },
        {
          "name": "inputTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "outputTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Token program for USDC mint"
          ]
        }
      ],
      "args": [
        {
          "name": "minOut",
          "type": "u64"
        }
      ]
    },
    {
      "name": "crankV2TwoHop",
      "accounts": [
        {
          "name": "stakePool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Global state"
          ]
        },
        {
          "name": "usdcFeeVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "In the Gamma swap CPI, this is user_out_ata"
          ]
        },
        {
          "name": "usdcRewardVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "USDC reward account, fees distribute from here."
          ]
        },
        {
          "name": "usdcFeeSigner",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "that swaps an arbitrary token for USDC."
          ]
        },
        {
          "name": "gfxAmmProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The swap CPI calls this program"
          ]
        },
        {
          "name": "ammAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "hop1AmmPoolState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hop1AmmObservationState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hop1AmmInputVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hop1AmmOutputVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userInAta",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "This must be a token account owned by the [FeesCollected] PDA."
          ]
        },
        {
          "name": "inputTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "intermediateTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "outputTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inputTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "intermediateTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "outputTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "intermediateTokenAccount",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "the first hop.",
            "This is a token account owned by the [FeesCollected] PDA and is",
            "provided as input to the second hop."
          ]
        },
        {
          "name": "hop2AmmPoolState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hop2AmmObservationState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hop2AmmInputVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hop2AmmOutputVault",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "minOutHop1",
          "type": "u64"
        },
        {
          "name": "minOutHop2",
          "type": "u64"
        }
      ]
    },
    {
      "name": "stake",
      "docs": [
        "Stake"
      ],
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "stakePool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Global state"
          ]
        },
        {
          "name": "userRewardsHoldingAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "User's reward are escrowed at TokenAccount of their UserMetadata"
          ]
        },
        {
          "name": "usdcRewardVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "USDC reward account, fees distribute from here."
          ]
        },
        {
          "name": "usdcRewardSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerGofx",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gofxVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "unstake",
      "docs": [
        "Unstake"
      ],
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Signer, user metadata account owner"
          ]
        },
        {
          "name": "stakePool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Global state"
          ]
        },
        {
          "name": "userRewardsHoldingAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "User's reward are escrowed at TokenAccount of their UserMetadata"
          ]
        },
        {
          "name": "gofxVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Stores the staked GOFX. This instruction will transfer",
            "GOFX out of here into the `gofx_unstaked_vault`."
          ]
        },
        {
          "name": "gofxUnstakedVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Stores unstaked GOFX which awaits a claim by an unstaking ticket."
          ]
        },
        {
          "name": "gofxVaultSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userMetadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "We add a ticket to this account."
          ]
        },
        {
          "name": "usdcRewardVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "USDC reward account, fees distribute from here."
          ]
        },
        {
          "name": "usdcRewardSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "resolveUnstakingTicket",
      "docs": [
        "Resolve Unstaking Ticket"
      ],
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The user signing for staking activity on this program."
          ]
        },
        {
          "name": "gofxUnstakedVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The associated GOFX account for [self.gofx_unstaked_signer],",
            "and the vault that stores GOFX that will be reclaimed by an unstaking ticket."
          ]
        },
        {
          "name": "gofxUnstakedSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerGofx",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The associated GOFX account for [self.owner]."
          ]
        },
        {
          "name": "userMetadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The metadata account belonging to [self.owner]."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "indices",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "crankUserRewardsHoldingAccount",
      "docs": [
        "Claim a user's share of fees on behalf of them to their holding account"
      ],
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userRewardsHoldingAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "User's reward are escrowed at TokenAccount of their UserMetadata"
          ]
        },
        {
          "name": "stakePool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Global state"
          ]
        },
        {
          "name": "gofxVault",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "GOFX Staking vault"
          ]
        },
        {
          "name": "usdcRewardVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "USDC reward account, fees distribute from here."
          ]
        },
        {
          "name": "usdcRewardSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userMetadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Stores user staking information"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "claimFees",
      "docs": [
        "Claim a share of the collected fees."
      ],
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Owner of the user metadata account"
          ]
        },
        {
          "name": "usdcMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "USDC Mint, required for the TokenAccount PDA"
          ]
        },
        {
          "name": "userRewardsHoldingAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "A user's unique PDA that points to the TokenAccount escrowing",
            "their balance"
          ]
        },
        {
          "name": "userUsdcAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "usdcRewardSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userMetadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Stores user staking information"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "closeUserAccount",
      "docs": [
        "Close a user metadata PDA and return the rent lamports",
        "once they close out of all interaction with this program."
      ],
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Signer, user metadata account owner"
          ]
        },
        {
          "name": "rentRecipient",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Recipient of the lamports that supplied the rent-exempt balance",
            "of the user metadata account being closed."
          ]
        },
        {
          "name": "userMetadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Close this account"
          ]
        },
        {
          "name": "userRewardsHoldingAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "User's reward are escrowed at TokenAccount of their UserMetadata"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createTokenDistributor",
      "docs": [
        "Create an account configured to distribute token balances fractionally to multiple",
        "sources. This allows funneling portions of fee revenue from a single intermediary",
        "to multiple locations, one of them being this program."
      ],
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The authority for the new token distributor.",
            "Only this signer can configure the [TokenDistributionConfig] accounts",
            "for this [TokenDistributor]."
          ]
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Pays for the initialization of the new [TokenDistributor]."
          ]
        },
        {
          "name": "tokenDistributor",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createTokenDistributionConfig",
      "docs": [
        "Create configuration state for the token distribution of a given mint."
      ],
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The authority for the new token distribution config.",
            "Only this signer can configure the [TokenDistributionConfig] accounts",
            "for this [TokenDistributor]."
          ]
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Pays for the initialization of the new [TokenDistributionConfig],",
            "and the [TokenDistributor]'s associated token account for this mint."
          ]
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The mint for the newly created [TokenDistributionConfig]."
          ]
        },
        {
          "name": "tokenDistributor",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The distributor who will own the ATA for this mint and sign for",
            "balance transfers during token distribution."
          ]
        },
        {
          "name": "tokenDistributionConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAct",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "config",
          "type": {
            "vec": {
              "defined": "TokenDestination"
            }
          }
        }
      ]
    },
    {
      "name": "configureTokenDistribution",
      "docs": [
        "Configure the token distribution of a given mint."
      ],
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true,
          "docs": [
            "The authority for the new token distribution config.",
            "Only this signer can configure the [TokenDistributionConfig] accounts",
            "for this [TokenDistributor]."
          ]
        },
        {
          "name": "tokenDistributionConfig",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "config",
          "type": {
            "vec": {
              "defined": "TokenDestination"
            }
          }
        }
      ]
    },
    {
      "name": "crankTokenDistribution",
      "docs": [
        "Distribute tokens to multiple destinations according to a given configuration."
      ],
      "accounts": [
        {
          "name": "tokenDistributor",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenDistributionConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "from",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initializeTokenCrank",
      "docs": [
        "Initialize a generic token-crank, configured to specific `output-mint` and `destination-signer`"
      ],
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenCrank",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "crankSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "outputMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The crank output mint"
          ]
        },
        {
          "name": "crankOutputVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "This account receives the crank output and transfers it to the distribution vault"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "destinationOwner",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "crankTokensGamma",
      "docs": [
        "For a specific crank, swap the balance of one of its crank-signer's token-accounts to the crank output-mint"
      ],
      "accounts": [
        {
          "name": "crank",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Crank state"
          ]
        },
        {
          "name": "crankSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "crankInputAta",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "This must be a token account owned by the crank_signer PDA."
          ]
        },
        {
          "name": "destinationOwner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "outputTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gammaProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The swap CPI calls this program"
          ]
        },
        {
          "name": "ammAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "hop1AmmPoolState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hop1AmmObservationState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hop1AmmInputVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hop1AmmOutputVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inputTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "intermediateTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "outputTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inputTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "intermediateTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "outputTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "hop1CrankOutputVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "the first hop.",
            "This is a token account owned by the `crank_signer` PDA and is",
            "provided as input to the second hop."
          ]
        },
        {
          "name": "hop2AmmPoolState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hop2AmmObservationState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hop2AmmInputVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hop2AmmOutputVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lastHopCrankOutputVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The vault for holding the output of the last hop(either first or second depending on the case)"
          ]
        }
      ],
      "args": [
        {
          "name": "minOutHop1",
          "type": "u64"
        },
        {
          "name": "minOutHop2",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeLstRewards",
      "docs": [
        "Initialize the LST rewards instance"
      ],
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "lstRewards",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "authority",
          "type": "publicKey"
        },
        {
          "name": "destinationReserveAccount",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "updateLstRewardsParams",
      "docs": [
        "Update the params for LSTRewards, such as authority or the destination reserve account"
      ],
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "lstRewards",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "authority",
          "type": {
            "option": "publicKey"
          }
        },
        {
          "name": "destinationReserveAccount",
          "type": {
            "option": "publicKey"
          }
        }
      ]
    },
    {
      "name": "transferLstRewards",
      "docs": [
        "Transfer SOL from rewards native token-account to the destination reserve"
      ],
      "accounts": [
        {
          "name": "lstRewards",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardsTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "tokenCrank",
      "docs": [
        "A global account that stores the result of cranking multiple tokens owned by",
        "a particular PDA to a single output mint."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "outputMint",
            "docs": [
              "The output mint for token cranks"
            ],
            "type": "publicKey"
          },
          {
            "name": "totalAccumulatedTokens",
            "docs": [
              "A monotonically increasing value, that increments each time the output-mint",
              "is added to the [OutputVault]'s associated token account"
            ],
            "type": "u128"
          },
          {
            "name": "protocolActivatedAt",
            "docs": [
              "Protocol activation time"
            ],
            "type": "i64"
          },
          {
            "name": "destinationOwner",
            "docs": [
              "The signer of the token-account output tokens are transferred to"
            ],
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "lstRewards",
      "docs": [
        "Account storing information about LSTRewards. This account also acts",
        "as the signer to transfer SOL from its token-account to a reserve-account."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "docs": [
              "The authority of this account.",
              "Allowed to set a new `authority`, `crank`, or `reserve_account`"
            ],
            "type": "publicKey"
          },
          {
            "name": "reserveAccount",
            "docs": [
              "The reserve stake account that receives SOL from the crank output"
            ],
            "type": "publicKey"
          },
          {
            "name": "totalLamportsDistributed",
            "docs": [
              "The total number of lamports send to the reserve account"
            ],
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "stakePool",
      "docs": [
        "A global account that stores global staking information."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalAccumulatedProfit",
            "docs": [
              "A monotonically increasing value, that increments each time",
              "USDC is added to the [UsdcRewardVault]'s associated USDC account."
            ],
            "type": "u64"
          },
          {
            "name": "protocolActivatedAt",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "tokenDistributionConfig",
      "docs": [
        "A configuration for a given mint that lists multiple accounts",
        "where the fees should be transferred, and in what proportion.",
        "",
        "In other words, if a [TokenDistributor] intends to distribute MSOL",
        "to multiple locations, a [TokenDistributionConfig] should be created for MSOL,",
        "listing those locations and the fractions of the token balance to be distributed.",
        "",
        "For each mint for which tokens are being distributed,",
        "a [TokenDistributor] should have initialized one of these."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "docs": [
              "Only this authority can initialize or configure a [TokenDestinationConfig]."
            ],
            "type": "publicKey"
          },
          {
            "name": "mint",
            "docs": [
              "The mint of the token accounts that will be transferred."
            ],
            "type": "publicKey"
          },
          {
            "name": "len",
            "docs": [
              "The number of non-default elements in the configuration array.",
              "These elements must be contiguous. This constraint is enforced in [sanitize_token_dest_config]."
            ],
            "type": "u32"
          },
          {
            "name": "destinations",
            "docs": [
              "A list of destination accounts paired with fractional destinations",
              "for each of them. The sum of all fractions here must add up to exactly ten thousand."
            ],
            "type": {
              "array": [
                {
                  "defined": "TokenDestination"
                },
                10
              ]
            }
          }
        ]
      }
    },
    {
      "name": "tokenDistributor",
      "docs": [
        "An account that acts as an authority over various token accounts,",
        "and facilitates proportional transfer of those token balances",
        "to multiple destinations. This allows tokens to be programmatically",
        "distributed from one account to many others.",
        "",
        "The intention is to use token accounts owned by a [TokenDistributor] to",
        "retain some fraction of fee revenue for staking rewards, and move the rest",
        "of the fee revenue to treasury accounts.",
        "",
        "This account is the token owner of various token accounts, and signs for",
        "their transfers during distribution. The destination accounts are configured",
        "in a [TokenDistributionConfig]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "docs": [
              "Only this authority can initialize and configure [TokenDistributionConfig]",
              "accounts that are controlled by this [TokenDistributor]."
            ],
            "type": "publicKey"
          },
          {
            "name": "bump",
            "docs": [
              "Recording the bump on this account so that we do not need to recalculate it",
              "`N` times for `N` signed transfer instructions during token distribution cranks."
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "userMetadata",
      "docs": [
        "Contains information about a user's staking activity,",
        "including how much they have staked, the last seen total accumulated profit,",
        "and an array of unstaking operations which have yet to be resolved by the user."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "accountOpenedAt",
            "docs": [
              "Timestamp of when the user metadata account was opened."
            ],
            "type": "i64"
          },
          {
            "name": "totalStaked",
            "docs": [
              "The total amount of GOFX staked by a given user."
            ],
            "type": "u64"
          },
          {
            "name": "lastObservedTap",
            "docs": [
              "The total accumulated profit at the time of a user's previous",
              "execution of claim fee logic.",
              "This value is also updated when a user's stake account changes",
              "from zero to some non-zero value,"
            ],
            "type": "u64"
          },
          {
            "name": "lastClaimed",
            "docs": [
              "Timestamp of the last time the user executed the `claim_fees` instruction."
            ],
            "type": "i64"
          },
          {
            "name": "totalEarned",
            "docs": [
              "The total amount of GOFX earn over the history of the user's staking account."
            ],
            "type": "u64"
          },
          {
            "name": "unstakingTickets",
            "docs": [
              "Any unstaking operations will result in unstaking tickets located",
              "on this array.",
              "When it comes to resolving these unstaking tickets,",
              "it is up to the instruction caller to know which indices to pass."
            ],
            "type": {
              "array": [
                {
                  "defined": "UnstakingTicket"
                },
                64
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "TokenDestination",
      "docs": [
        "A destination account and fraction (in BPS) of token balance",
        "that should be transferred to that destination.",
        "",
        "A [TokenDistributionConfig] is stores set of these [TokenDestination]s",
        "for a given mint."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenAct",
            "docs": [
              "The destination token account."
            ],
            "type": "publicKey"
          },
          {
            "name": "fraction",
            "docs": [
              "Basis-points (100ths of a percent)"
            ],
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "UnstakingTicket",
      "docs": [
        "Represents some unstaked GOFX that can be redeemed 7 days after",
        "the creation of this account."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalUnstaked",
            "docs": [
              "The total amount of unstaked GOFX, which will be redeemable after",
              "the 7-day cooldown."
            ],
            "type": "u64"
          },
          {
            "name": "createdAt",
            "docs": [
              "The clock timestamp of when this account was created.",
              "The GOFX unstaked is redeemable >=7 days after this timestamp."
            ],
            "type": "i64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "OverflowError",
      "msg": "Overflow"
    },
    {
      "code": 6001,
      "name": "ScaleExceedsMaximumPrecision",
      "msg": "Scale exceeds maximum precision"
    },
    {
      "code": 6002,
      "name": "NotEnoughSpaceUnstakingTicket",
      "msg": "No space left for an additional unstaking claim ticket."
    },
    {
      "code": 6003,
      "name": "CannotCloseUserAccountStake",
      "msg": "Cannot close a user account until all GOFX is unstaked"
    },
    {
      "code": 6004,
      "name": "CannotCloseUserAccountTickets",
      "msg": "Cannot close a user account until all GOFX unstaking tickets are claimed"
    },
    {
      "code": 6005,
      "name": "InvalidTokenDistributionConfig",
      "msg": "Token distribution config elements must be non-empty and contain non-zero fractions that sum to 10_000"
    },
    {
      "code": 6006,
      "name": "InvalidTokenDistributor",
      "msg": "Token distributor does not match"
    },
    {
      "code": 6007,
      "name": "InvalidTokenAccount",
      "msg": "Token accounts must be passed in the same order as the token distribution config"
    },
    {
      "code": 6008,
      "name": "NotEnoughTokenAccounts",
      "msg": "Cranking token distribution requires inclusion of all token accounts listed in the token distribution config"
    },
    {
      "code": 6009,
      "name": "InsufficientTokenDistributionBalance",
      "msg": "Source token balance must be >=10_000 to crank token distribution"
    },
    {
      "code": 6010,
      "name": "CannotCloseUserAccountRewards",
      "msg": "Cannot close a user account until all rewards are claimed"
    },
    {
      "code": 6011,
      "name": "InvalidCrank",
      "msg": "Crank instruction does not result in the expected output mint"
    }
  ]
};

export const IDL: GfxStakeRewardsProgramTypes = {
  "version": "0.1.0",
  "name": "gfx_stake_rewards",
  "docs": [
    "See this module for instruction documentation."
  ],
  "instructions": [
    {
      "name": "initializeGlobalAccounts",
      "docs": [
        "Initialize global accounts"
      ],
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "payerGofx",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gofxVaultSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "gofxUnstakedSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "usdcFeeSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "usdcRewardSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "gofxVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "This instruction initializes the token account",
            "required for storing staked GOFX."
          ]
        },
        {
          "name": "usdcRewardVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "This instruction initializes the token account",
            "required for storing USDC rewards."
          ]
        },
        {
          "name": "gofxUnstakedVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "This instruction initializes the token account",
            "required for storing unstaked GOFX before it is reclaimed."
          ]
        },
        {
          "name": "usdcFeeVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "This instruction initializes the token account",
            "required for storing USDC fees collected for distribution."
          ]
        },
        {
          "name": "gofxMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Needed for account initialization"
          ]
        },
        {
          "name": "usdcMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Needed for account initialization"
          ]
        },
        {
          "name": "stakePool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "This instruction initializes the global account struct that stores",
            "staking information."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initializeUserAccount",
      "docs": [
        "Initialize user accounts"
      ],
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "This address will be the owner of the user metadata account being initialized."
          ]
        },
        {
          "name": "funder",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "This field allows a separate funder for the rent-exempt balance",
            "of the accounts being initialized here."
          ]
        },
        {
          "name": "stakePool",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Global state"
          ]
        },
        {
          "name": "usdcMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userMetadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "User metadata account being initialized"
          ]
        },
        {
          "name": "userRewardsHoldingAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "User's reward are escrowed at TokenAccount of their UserMetadata"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "crank",
      "docs": [
        "Crank"
      ],
      "accounts": [
        {
          "name": "stakePool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Global state"
          ]
        },
        {
          "name": "usdcFeeVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "In the SSL swap CPI, this is user_out_ata"
          ]
        },
        {
          "name": "usdcRewardVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "USDC reward account, fees distribute from here."
          ]
        },
        {
          "name": "usdcFeeSigner",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "that swaps an arbitrary token for USDC."
          ]
        },
        {
          "name": "gfxSslProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The swap CPI calls this program"
          ]
        },
        {
          "name": "controller",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pair",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sslIn",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sslOut",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "liabilityVaultIn",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "swappedLiabilityVaultIn",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "liabilityVaultOut",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "swappedLiabilityVaultOut",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userInAta",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "This must be a USDC token account owned by the [FeesCollected] PDA."
          ]
        },
        {
          "name": "feeCollectorAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userWallet",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "feeCollector",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "minOut",
          "type": "u64"
        }
      ]
    },
    {
      "name": "crankV2Single",
      "accounts": [
        {
          "name": "stakePool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Global state"
          ]
        },
        {
          "name": "usdcFeeVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "In the Gamma swap CPI, this is user_out_ata"
          ]
        },
        {
          "name": "usdcRewardVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "USDC reward account, fees distribute from here."
          ]
        },
        {
          "name": "usdcFeeSigner",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "that swaps an arbitrary token for USDC."
          ]
        },
        {
          "name": "gfxAmmProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The swap CPI calls this program"
          ]
        },
        {
          "name": "ammAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammPoolState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammObservationState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammInputVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "ammOutputVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inputTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "outputTokenMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "USDC mint"
          ]
        },
        {
          "name": "userInAta",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "This must be a token account owned by the [FeesCollected] PDA."
          ]
        },
        {
          "name": "inputTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "outputTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Token program for USDC mint"
          ]
        }
      ],
      "args": [
        {
          "name": "minOut",
          "type": "u64"
        }
      ]
    },
    {
      "name": "crankV2TwoHop",
      "accounts": [
        {
          "name": "stakePool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Global state"
          ]
        },
        {
          "name": "usdcFeeVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "In the Gamma swap CPI, this is user_out_ata"
          ]
        },
        {
          "name": "usdcRewardVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "USDC reward account, fees distribute from here."
          ]
        },
        {
          "name": "usdcFeeSigner",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "that swaps an arbitrary token for USDC."
          ]
        },
        {
          "name": "gfxAmmProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The swap CPI calls this program"
          ]
        },
        {
          "name": "ammAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "hop1AmmPoolState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hop1AmmObservationState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hop1AmmInputVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hop1AmmOutputVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userInAta",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "This must be a token account owned by the [FeesCollected] PDA."
          ]
        },
        {
          "name": "inputTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "intermediateTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "outputTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inputTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "intermediateTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "outputTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "intermediateTokenAccount",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "the first hop.",
            "This is a token account owned by the [FeesCollected] PDA and is",
            "provided as input to the second hop."
          ]
        },
        {
          "name": "hop2AmmPoolState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hop2AmmObservationState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hop2AmmInputVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hop2AmmOutputVault",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "minOutHop1",
          "type": "u64"
        },
        {
          "name": "minOutHop2",
          "type": "u64"
        }
      ]
    },
    {
      "name": "stake",
      "docs": [
        "Stake"
      ],
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "stakePool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Global state"
          ]
        },
        {
          "name": "userRewardsHoldingAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "User's reward are escrowed at TokenAccount of their UserMetadata"
          ]
        },
        {
          "name": "usdcRewardVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "USDC reward account, fees distribute from here."
          ]
        },
        {
          "name": "usdcRewardSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerGofx",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gofxVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "unstake",
      "docs": [
        "Unstake"
      ],
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Signer, user metadata account owner"
          ]
        },
        {
          "name": "stakePool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Global state"
          ]
        },
        {
          "name": "userRewardsHoldingAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "User's reward are escrowed at TokenAccount of their UserMetadata"
          ]
        },
        {
          "name": "gofxVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Stores the staked GOFX. This instruction will transfer",
            "GOFX out of here into the `gofx_unstaked_vault`."
          ]
        },
        {
          "name": "gofxUnstakedVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Stores unstaked GOFX which awaits a claim by an unstaking ticket."
          ]
        },
        {
          "name": "gofxVaultSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userMetadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "We add a ticket to this account."
          ]
        },
        {
          "name": "usdcRewardVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "USDC reward account, fees distribute from here."
          ]
        },
        {
          "name": "usdcRewardSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "resolveUnstakingTicket",
      "docs": [
        "Resolve Unstaking Ticket"
      ],
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The user signing for staking activity on this program."
          ]
        },
        {
          "name": "gofxUnstakedVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The associated GOFX account for [self.gofx_unstaked_signer],",
            "and the vault that stores GOFX that will be reclaimed by an unstaking ticket."
          ]
        },
        {
          "name": "gofxUnstakedSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ownerGofx",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The associated GOFX account for [self.owner]."
          ]
        },
        {
          "name": "userMetadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The metadata account belonging to [self.owner]."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "indices",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "crankUserRewardsHoldingAccount",
      "docs": [
        "Claim a user's share of fees on behalf of them to their holding account"
      ],
      "accounts": [
        {
          "name": "user",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userRewardsHoldingAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "User's reward are escrowed at TokenAccount of their UserMetadata"
          ]
        },
        {
          "name": "stakePool",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Global state"
          ]
        },
        {
          "name": "gofxVault",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "GOFX Staking vault"
          ]
        },
        {
          "name": "usdcRewardVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "USDC reward account, fees distribute from here."
          ]
        },
        {
          "name": "usdcRewardSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userMetadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Stores user staking information"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "claimFees",
      "docs": [
        "Claim a share of the collected fees."
      ],
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Owner of the user metadata account"
          ]
        },
        {
          "name": "usdcMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "USDC Mint, required for the TokenAccount PDA"
          ]
        },
        {
          "name": "userRewardsHoldingAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "A user's unique PDA that points to the TokenAccount escrowing",
            "their balance"
          ]
        },
        {
          "name": "userUsdcAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "usdcRewardSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userMetadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Stores user staking information"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "closeUserAccount",
      "docs": [
        "Close a user metadata PDA and return the rent lamports",
        "once they close out of all interaction with this program."
      ],
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Signer, user metadata account owner"
          ]
        },
        {
          "name": "rentRecipient",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Recipient of the lamports that supplied the rent-exempt balance",
            "of the user metadata account being closed."
          ]
        },
        {
          "name": "userMetadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Close this account"
          ]
        },
        {
          "name": "userRewardsHoldingAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "User's reward are escrowed at TokenAccount of their UserMetadata"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createTokenDistributor",
      "docs": [
        "Create an account configured to distribute token balances fractionally to multiple",
        "sources. This allows funneling portions of fee revenue from a single intermediary",
        "to multiple locations, one of them being this program."
      ],
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The authority for the new token distributor.",
            "Only this signer can configure the [TokenDistributionConfig] accounts",
            "for this [TokenDistributor]."
          ]
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Pays for the initialization of the new [TokenDistributor]."
          ]
        },
        {
          "name": "tokenDistributor",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "createTokenDistributionConfig",
      "docs": [
        "Create configuration state for the token distribution of a given mint."
      ],
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The authority for the new token distribution config.",
            "Only this signer can configure the [TokenDistributionConfig] accounts",
            "for this [TokenDistributor]."
          ]
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Pays for the initialization of the new [TokenDistributionConfig],",
            "and the [TokenDistributor]'s associated token account for this mint."
          ]
        },
        {
          "name": "mint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The mint for the newly created [TokenDistributionConfig]."
          ]
        },
        {
          "name": "tokenDistributor",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The distributor who will own the ATA for this mint and sign for",
            "balance transfers during token distribution."
          ]
        },
        {
          "name": "tokenDistributionConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAct",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "config",
          "type": {
            "vec": {
              "defined": "TokenDestination"
            }
          }
        }
      ]
    },
    {
      "name": "configureTokenDistribution",
      "docs": [
        "Configure the token distribution of a given mint."
      ],
      "accounts": [
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true,
          "docs": [
            "The authority for the new token distribution config.",
            "Only this signer can configure the [TokenDistributionConfig] accounts",
            "for this [TokenDistributor]."
          ]
        },
        {
          "name": "tokenDistributionConfig",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "config",
          "type": {
            "vec": {
              "defined": "TokenDestination"
            }
          }
        }
      ]
    },
    {
      "name": "crankTokenDistribution",
      "docs": [
        "Distribute tokens to multiple destinations according to a given configuration."
      ],
      "accounts": [
        {
          "name": "tokenDistributor",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenDistributionConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "from",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initializeTokenCrank",
      "docs": [
        "Initialize a generic token-crank, configured to specific `output-mint` and `destination-signer`"
      ],
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenCrank",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "crankSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "outputMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The crank output mint"
          ]
        },
        {
          "name": "crankOutputVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "This account receives the crank output and transfers it to the distribution vault"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "destinationOwner",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "crankTokensGamma",
      "docs": [
        "For a specific crank, swap the balance of one of its crank-signer's token-accounts to the crank output-mint"
      ],
      "accounts": [
        {
          "name": "crank",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Crank state"
          ]
        },
        {
          "name": "crankSigner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "crankInputAta",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "This must be a token account owned by the crank_signer PDA."
          ]
        },
        {
          "name": "destinationOwner",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "outputTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "gammaProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The swap CPI calls this program"
          ]
        },
        {
          "name": "ammAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "ammConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "hop1AmmPoolState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hop1AmmObservationState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hop1AmmInputVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hop1AmmOutputVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "inputTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "intermediateTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "outputTokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "inputTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "intermediateTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "outputTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "hop1CrankOutputVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "the first hop.",
            "This is a token account owned by the `crank_signer` PDA and is",
            "provided as input to the second hop."
          ]
        },
        {
          "name": "hop2AmmPoolState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hop2AmmObservationState",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hop2AmmInputVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "hop2AmmOutputVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lastHopCrankOutputVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The vault for holding the output of the last hop(either first or second depending on the case)"
          ]
        }
      ],
      "args": [
        {
          "name": "minOutHop1",
          "type": "u64"
        },
        {
          "name": "minOutHop2",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeLstRewards",
      "docs": [
        "Initialize the LST rewards instance"
      ],
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "lstRewards",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "authority",
          "type": "publicKey"
        },
        {
          "name": "destinationReserveAccount",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "updateLstRewardsParams",
      "docs": [
        "Update the params for LSTRewards, such as authority or the destination reserve account"
      ],
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "lstRewards",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "authority",
          "type": {
            "option": "publicKey"
          }
        },
        {
          "name": "destinationReserveAccount",
          "type": {
            "option": "publicKey"
          }
        }
      ]
    },
    {
      "name": "transferLstRewards",
      "docs": [
        "Transfer SOL from rewards native token-account to the destination reserve"
      ],
      "accounts": [
        {
          "name": "lstRewards",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardsTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "reserveAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "tokenCrank",
      "docs": [
        "A global account that stores the result of cranking multiple tokens owned by",
        "a particular PDA to a single output mint."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "outputMint",
            "docs": [
              "The output mint for token cranks"
            ],
            "type": "publicKey"
          },
          {
            "name": "totalAccumulatedTokens",
            "docs": [
              "A monotonically increasing value, that increments each time the output-mint",
              "is added to the [OutputVault]'s associated token account"
            ],
            "type": "u128"
          },
          {
            "name": "protocolActivatedAt",
            "docs": [
              "Protocol activation time"
            ],
            "type": "i64"
          },
          {
            "name": "destinationOwner",
            "docs": [
              "The signer of the token-account output tokens are transferred to"
            ],
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "lstRewards",
      "docs": [
        "Account storing information about LSTRewards. This account also acts",
        "as the signer to transfer SOL from its token-account to a reserve-account."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "docs": [
              "The authority of this account.",
              "Allowed to set a new `authority`, `crank`, or `reserve_account`"
            ],
            "type": "publicKey"
          },
          {
            "name": "reserveAccount",
            "docs": [
              "The reserve stake account that receives SOL from the crank output"
            ],
            "type": "publicKey"
          },
          {
            "name": "totalLamportsDistributed",
            "docs": [
              "The total number of lamports send to the reserve account"
            ],
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "stakePool",
      "docs": [
        "A global account that stores global staking information."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalAccumulatedProfit",
            "docs": [
              "A monotonically increasing value, that increments each time",
              "USDC is added to the [UsdcRewardVault]'s associated USDC account."
            ],
            "type": "u64"
          },
          {
            "name": "protocolActivatedAt",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "tokenDistributionConfig",
      "docs": [
        "A configuration for a given mint that lists multiple accounts",
        "where the fees should be transferred, and in what proportion.",
        "",
        "In other words, if a [TokenDistributor] intends to distribute MSOL",
        "to multiple locations, a [TokenDistributionConfig] should be created for MSOL,",
        "listing those locations and the fractions of the token balance to be distributed.",
        "",
        "For each mint for which tokens are being distributed,",
        "a [TokenDistributor] should have initialized one of these."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "docs": [
              "Only this authority can initialize or configure a [TokenDestinationConfig]."
            ],
            "type": "publicKey"
          },
          {
            "name": "mint",
            "docs": [
              "The mint of the token accounts that will be transferred."
            ],
            "type": "publicKey"
          },
          {
            "name": "len",
            "docs": [
              "The number of non-default elements in the configuration array.",
              "These elements must be contiguous. This constraint is enforced in [sanitize_token_dest_config]."
            ],
            "type": "u32"
          },
          {
            "name": "destinations",
            "docs": [
              "A list of destination accounts paired with fractional destinations",
              "for each of them. The sum of all fractions here must add up to exactly ten thousand."
            ],
            "type": {
              "array": [
                {
                  "defined": "TokenDestination"
                },
                10
              ]
            }
          }
        ]
      }
    },
    {
      "name": "tokenDistributor",
      "docs": [
        "An account that acts as an authority over various token accounts,",
        "and facilitates proportional transfer of those token balances",
        "to multiple destinations. This allows tokens to be programmatically",
        "distributed from one account to many others.",
        "",
        "The intention is to use token accounts owned by a [TokenDistributor] to",
        "retain some fraction of fee revenue for staking rewards, and move the rest",
        "of the fee revenue to treasury accounts.",
        "",
        "This account is the token owner of various token accounts, and signs for",
        "their transfers during distribution. The destination accounts are configured",
        "in a [TokenDistributionConfig]."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "docs": [
              "Only this authority can initialize and configure [TokenDistributionConfig]",
              "accounts that are controlled by this [TokenDistributor]."
            ],
            "type": "publicKey"
          },
          {
            "name": "bump",
            "docs": [
              "Recording the bump on this account so that we do not need to recalculate it",
              "`N` times for `N` signed transfer instructions during token distribution cranks."
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "userMetadata",
      "docs": [
        "Contains information about a user's staking activity,",
        "including how much they have staked, the last seen total accumulated profit,",
        "and an array of unstaking operations which have yet to be resolved by the user."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "accountOpenedAt",
            "docs": [
              "Timestamp of when the user metadata account was opened."
            ],
            "type": "i64"
          },
          {
            "name": "totalStaked",
            "docs": [
              "The total amount of GOFX staked by a given user."
            ],
            "type": "u64"
          },
          {
            "name": "lastObservedTap",
            "docs": [
              "The total accumulated profit at the time of a user's previous",
              "execution of claim fee logic.",
              "This value is also updated when a user's stake account changes",
              "from zero to some non-zero value,"
            ],
            "type": "u64"
          },
          {
            "name": "lastClaimed",
            "docs": [
              "Timestamp of the last time the user executed the `claim_fees` instruction."
            ],
            "type": "i64"
          },
          {
            "name": "totalEarned",
            "docs": [
              "The total amount of GOFX earn over the history of the user's staking account."
            ],
            "type": "u64"
          },
          {
            "name": "unstakingTickets",
            "docs": [
              "Any unstaking operations will result in unstaking tickets located",
              "on this array.",
              "When it comes to resolving these unstaking tickets,",
              "it is up to the instruction caller to know which indices to pass."
            ],
            "type": {
              "array": [
                {
                  "defined": "UnstakingTicket"
                },
                64
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "TokenDestination",
      "docs": [
        "A destination account and fraction (in BPS) of token balance",
        "that should be transferred to that destination.",
        "",
        "A [TokenDistributionConfig] is stores set of these [TokenDestination]s",
        "for a given mint."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tokenAct",
            "docs": [
              "The destination token account."
            ],
            "type": "publicKey"
          },
          {
            "name": "fraction",
            "docs": [
              "Basis-points (100ths of a percent)"
            ],
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "UnstakingTicket",
      "docs": [
        "Represents some unstaked GOFX that can be redeemed 7 days after",
        "the creation of this account."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalUnstaked",
            "docs": [
              "The total amount of unstaked GOFX, which will be redeemable after",
              "the 7-day cooldown."
            ],
            "type": "u64"
          },
          {
            "name": "createdAt",
            "docs": [
              "The clock timestamp of when this account was created.",
              "The GOFX unstaked is redeemable >=7 days after this timestamp."
            ],
            "type": "i64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "OverflowError",
      "msg": "Overflow"
    },
    {
      "code": 6001,
      "name": "ScaleExceedsMaximumPrecision",
      "msg": "Scale exceeds maximum precision"
    },
    {
      "code": 6002,
      "name": "NotEnoughSpaceUnstakingTicket",
      "msg": "No space left for an additional unstaking claim ticket."
    },
    {
      "code": 6003,
      "name": "CannotCloseUserAccountStake",
      "msg": "Cannot close a user account until all GOFX is unstaked"
    },
    {
      "code": 6004,
      "name": "CannotCloseUserAccountTickets",
      "msg": "Cannot close a user account until all GOFX unstaking tickets are claimed"
    },
    {
      "code": 6005,
      "name": "InvalidTokenDistributionConfig",
      "msg": "Token distribution config elements must be non-empty and contain non-zero fractions that sum to 10_000"
    },
    {
      "code": 6006,
      "name": "InvalidTokenDistributor",
      "msg": "Token distributor does not match"
    },
    {
      "code": 6007,
      "name": "InvalidTokenAccount",
      "msg": "Token accounts must be passed in the same order as the token distribution config"
    },
    {
      "code": 6008,
      "name": "NotEnoughTokenAccounts",
      "msg": "Cranking token distribution requires inclusion of all token accounts listed in the token distribution config"
    },
    {
      "code": 6009,
      "name": "InsufficientTokenDistributionBalance",
      "msg": "Source token balance must be >=10_000 to crank token distribution"
    },
    {
      "code": 6010,
      "name": "CannotCloseUserAccountRewards",
      "msg": "Cannot close a user account until all rewards are claimed"
    },
    {
      "code": 6011,
      "name": "InvalidCrank",
      "msg": "Crank instruction does not result in the expected output mint"
    }
  ]
};
