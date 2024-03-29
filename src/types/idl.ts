export type GfxStakeRewardsProgramTypes = {
    "version": "0.1.0",
    "name": "gfx_stake_rewards",
    "instructions": [
        {
            "name": "initializeGlobalAccounts",
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
                    "isSigner": false
                },
                {
                    "name": "usdcRewardVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "gofxUnstakedVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "usdcFeeVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "gofxMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "usdcMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "stakePool",
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
            "args": []
        },
        {
            "name": "initializeUserAccount",
            "accounts": [
                {
                    "name": "owner",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "funder",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "stakePool",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "usdcMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "userMetadata",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userRewardsHoldingAccount",
                    "isMut": true,
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
            "accounts": [
                {
                    "name": "stakePool",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "usdcFeeVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "usdcRewardVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "usdcFeeSigner",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "gfxSslProgram",
                    "isMut": false,
                    "isSigner": false
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
                    "isSigner": false
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
            "name": "stake",
            "accounts": [
                {
                    "name": "owner",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "stakePool",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userRewardsHoldingAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "usdcRewardVault",
                    "isMut": true,
                    "isSigner": false
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
            "accounts": [
                {
                    "name": "owner",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "stakePool",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userRewardsHoldingAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "gofxVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "gofxUnstakedVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "gofxVaultSigner",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "userMetadata",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "usdcRewardVault",
                    "isMut": true,
                    "isSigner": false
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
            "accounts": [
                {
                    "name": "owner",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "gofxUnstakedVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "gofxUnstakedSigner",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "ownerGofx",
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
                    "name": "indices",
                    "type": "bytes"
                }
            ]
        },
        {
            "name": "crankUserRewardsHoldingAccount",
            "accounts": [
                {
                    "name": "user",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "userRewardsHoldingAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "stakePool",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "gofxVault",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "usdcRewardVault",
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
                    "isSigner": false
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
            "accounts": [
                {
                    "name": "owner",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "usdcMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "userRewardsHoldingAccount",
                    "isMut": true,
                    "isSigner": false
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
            "name": "closeUserAccount",
            "accounts": [
                {
                    "name": "owner",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "rentRecipient",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userMetadata",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userRewardsHoldingAccount",
                    "isMut": true,
                    "isSigner": false
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
            "accounts": [
                {
                    "name": "authority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "payer",
                    "isMut": true,
                    "isSigner": true
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
            "accounts": [
                {
                    "name": "authority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "payer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "mint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenDistributor",
                    "isMut": false,
                    "isSigner": false
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
            "accounts": [
                {
                    "name": "authority",
                    "isMut": false,
                    "isSigner": true
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
        }
    ],
    "accounts": [
        {
            "name": "stakePool",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "totalAccumulatedProfit",
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
            "name": "userMetadata",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "owner",
                        "type": "publicKey"
                    },
                    {
                        "name": "accountOpenedAt",
                        "type": "i64"
                    },
                    {
                        "name": "totalStaked",
                        "type": "u64"
                    },
                    {
                        "name": "lastObservedTap",
                        "type": "u64"
                    },
                    {
                        "name": "lastClaimed",
                        "type": "i64"
                    },
                    {
                        "name": "totalEarned",
                        "type": "u64"
                    },
                    {
                        "name": "unstakingTickets",
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
        },
        {
            "name": "usdcRewardVault",
            "type": {
                "kind": "struct",
                "fields": []
            }
        },
        {
            "name": "feesCollected",
            "type": {
                "kind": "struct",
                "fields": []
            }
        },
        {
            "name": "tokenDistributor",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "authority",
                        "type": "publicKey"
                    },
                    {
                        "name": "bump",
                        "type": "u8"
                    }
                ]
            }
        },
        {
            "name": "tokenDistributionConfig",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "authority",
                        "type": "publicKey"
                    },
                    {
                        "name": "mint",
                        "type": "publicKey"
                    },
                    {
                        "name": "len",
                        "type": "u32"
                    },
                    {
                        "name": "destinations",
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
            "name": "gofxVault",
            "type": {
                "kind": "struct",
                "fields": []
            }
        },
        {
            "name": "gofxUnstaked",
            "type": {
                "kind": "struct",
                "fields": []
            }
        }
    ],
    "types": [
        {
            "name": "UnstakingTicket",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "totalUnstaked",
                        "type": "u64"
                    },
                    {
                        "name": "createdAt",
                        "type": "i64"
                    }
                ]
            }
        },
        {
            "name": "TokenDestination",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "tokenAct",
                        "type": "publicKey"
                    },
                    {
                        "name": "fraction",
                        "type": "u32"
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
        }
    ]
};

export const IDL: GfxStakeRewardsProgramTypes = {
    "version": "0.1.0",
    "name": "gfx_stake_rewards",
    "instructions": [
        {
            "name": "initializeGlobalAccounts",
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
                    "isSigner": false
                },
                {
                    "name": "usdcRewardVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "gofxUnstakedVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "usdcFeeVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "gofxMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "usdcMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "stakePool",
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
            "args": []
        },
        {
            "name": "initializeUserAccount",
            "accounts": [
                {
                    "name": "owner",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "funder",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "stakePool",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "usdcMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "userMetadata",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userRewardsHoldingAccount",
                    "isMut": true,
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
            "accounts": [
                {
                    "name": "stakePool",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "usdcFeeVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "usdcRewardVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "usdcFeeSigner",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "gfxSslProgram",
                    "isMut": false,
                    "isSigner": false
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
                    "isSigner": false
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
            "name": "stake",
            "accounts": [
                {
                    "name": "owner",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "stakePool",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userRewardsHoldingAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "usdcRewardVault",
                    "isMut": true,
                    "isSigner": false
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
            "accounts": [
                {
                    "name": "owner",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "stakePool",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userRewardsHoldingAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "gofxVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "gofxUnstakedVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "gofxVaultSigner",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "userMetadata",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "usdcRewardVault",
                    "isMut": true,
                    "isSigner": false
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
            "accounts": [
                {
                    "name": "owner",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "gofxUnstakedVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "gofxUnstakedSigner",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "ownerGofx",
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
                    "name": "indices",
                    "type": "bytes"
                }
            ]
        },
        {
            "name": "crankUserRewardsHoldingAccount",
            "accounts": [
                {
                    "name": "user",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "userRewardsHoldingAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "stakePool",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "gofxVault",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "usdcRewardVault",
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
                    "isSigner": false
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
            "accounts": [
                {
                    "name": "owner",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "usdcMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "userRewardsHoldingAccount",
                    "isMut": true,
                    "isSigner": false
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
            "name": "closeUserAccount",
            "accounts": [
                {
                    "name": "owner",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "rentRecipient",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userMetadata",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "userRewardsHoldingAccount",
                    "isMut": true,
                    "isSigner": false
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
            "accounts": [
                {
                    "name": "authority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "payer",
                    "isMut": true,
                    "isSigner": true
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
            "accounts": [
                {
                    "name": "authority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "payer",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "mint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenDistributor",
                    "isMut": false,
                    "isSigner": false
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
            "accounts": [
                {
                    "name": "authority",
                    "isMut": false,
                    "isSigner": true
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
        }
    ],
    "accounts": [
        {
            "name": "stakePool",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "totalAccumulatedProfit",
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
            "name": "userMetadata",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "owner",
                        "type": "publicKey"
                    },
                    {
                        "name": "accountOpenedAt",
                        "type": "i64"
                    },
                    {
                        "name": "totalStaked",
                        "type": "u64"
                    },
                    {
                        "name": "lastObservedTap",
                        "type": "u64"
                    },
                    {
                        "name": "lastClaimed",
                        "type": "i64"
                    },
                    {
                        "name": "totalEarned",
                        "type": "u64"
                    },
                    {
                        "name": "unstakingTickets",
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
        },
        {
            "name": "usdcRewardVault",
            "type": {
                "kind": "struct",
                "fields": []
            }
        },
        {
            "name": "feesCollected",
            "type": {
                "kind": "struct",
                "fields": []
            }
        },
        {
            "name": "tokenDistributor",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "authority",
                        "type": "publicKey"
                    },
                    {
                        "name": "bump",
                        "type": "u8"
                    }
                ]
            }
        },
        {
            "name": "tokenDistributionConfig",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "authority",
                        "type": "publicKey"
                    },
                    {
                        "name": "mint",
                        "type": "publicKey"
                    },
                    {
                        "name": "len",
                        "type": "u32"
                    },
                    {
                        "name": "destinations",
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
            "name": "gofxVault",
            "type": {
                "kind": "struct",
                "fields": []
            }
        },
        {
            "name": "gofxUnstaked",
            "type": {
                "kind": "struct",
                "fields": []
            }
        }
    ],
    "types": [
        {
            "name": "UnstakingTicket",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "totalUnstaked",
                        "type": "u64"
                    },
                    {
                        "name": "createdAt",
                        "type": "i64"
                    }
                ]
            }
        },
        {
            "name": "TokenDestination",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "tokenAct",
                        "type": "publicKey"
                    },
                    {
                        "name": "fraction",
                        "type": "u32"
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
        }
    ]
};
