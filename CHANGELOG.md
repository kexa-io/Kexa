## [2.5.2](https://github.com/kexa-io/Kexa/compare/v2.5.1...v2.5.2) (2025-10-30)


### Bug Fixes

* **rules:** azure filter on SP ([9ada9b4](https://github.com/kexa-io/Kexa/commit/9ada9b49255c7855bfd2b529f80b15515f5bf232))

## [2.5.1](https://github.com/kexa-io/Kexa/compare/v2.5.0...v2.5.1) (2025-10-30)


### Bug Fixes

* **executable:** install docs + minify ([62a996b](https://github.com/kexa-io/Kexa/commit/62a996ba24a4fd7234ecf3e318443eb42fd725e5))

# Changelog

## [v2.5.0] - 2025-10-30



### Bug Fixes

* **addon:** remove prometheus ([81439a8](https://github.com/kexa-io/Kexa/commit/81439a8cd677bf58f221fdf3c602e26eeceec0b8))
* **addon:** remove unused prometheus file ([57eec40](https://github.com/kexa-io/Kexa/commit/57eec40bfdfdbf23d0e6b64c55fc80cdb3a28992))
* **binary:** fixing long exec time due to static load ([5cf0f98](https://github.com/kexa-io/Kexa/commit/5cf0f9855360e4f58065d6730afcde7be7fbfb78))
* **executable:** dynamic gathering files imports ([8de97c5](https://github.com/kexa-io/Kexa/commit/8de97c5a8db479fb0c2600ed2b55b27d450deac0))
* **gcp:** add cis foundations rules (not complete) ([efba691](https://github.com/kexa-io/Kexa/commit/efba691ad4152a96d2d6e563e3d8c1ba4bf024ff))
* **gcp:** fix cluster array parsing ([230f3be](https://github.com/kexa-io/Kexa/commit/230f3be03a83a1e2343d4c1d90239980738b5bb8))
* **rules:** aws cis full foundations ([6a90150](https://github.com/kexa-io/Kexa/commit/6a9015037e99b66e1b8112658e6ccfddc36d874a))
* **rules:** azure cis & idles ([b2b4956](https://github.com/kexa-io/Kexa/commit/b2b495684ab236ad7f8aa6675aa54c1d8fdc903f))
* up missing packages ([18600e2](https://github.com/kexa-io/Kexa/commit/18600e2f21e981691b4504e6cba631a4a7b3331d))


### Features

* **aws:** cis foundations rules + kms dependencies ([0454bd7](https://github.com/kexa-io/Kexa/commit/0454bd761555677a6376365610d71da90bb35b14))
* **cicd:** release kexa executables ([75a37e4](https://github.com/kexa-io/Kexa/commit/75a37e4dd55fb5c0e94e6ed028e16a7c74a1624d))
* **executable:** install scripts ([e88cd82](https://github.com/kexa-io/Kexa/commit/e88cd826a956ccc8f052e0fdf1a87eee4a47632b))
* **executable:** store headers in Typescript bundled file ([f12f2df](https://github.com/kexa-io/Kexa/commit/f12f2dffbaa08334006bcfc9e6370ff0c64699d4))
* **gcp:** new gathered objects ([08f9534](https://github.com/kexa-io/Kexa/commit/08f953458862cf82cf23bba40a98b795d8412be3))
* **output:** json alerts output mode ([e54985b](https://github.com/kexa-io/Kexa/commit/e54985bf823dbaeed8c6eb7c9576be55328930ae))

# Changelog

## [v2.4.5] - 2025-10-23



### Bug Fixes

* **azure:** add pagination to custom gather object ([f476f75](https://github.com/kexa-io/Kexa/commit/f476f751d271fc79716551f8b884e36911889972))
* **rules:** sp expire correct rule ([ccd2448](https://github.com/kexa-io/Kexa/commit/ccd2448d759dd64ebadc481a69e72479236ef41f))
* **unit_tests:** move & await loadAddOnsCustomUtility call ([ec20ebc](https://github.com/kexa-io/Kexa/commit/ec20ebca600b0d733680bd739a33ad2f1bf5917e))

## [2.4.4](https://github.com/kexa-io/Kexa/compare/v2.4.3...v2.4.4) (2025-10-23)


### Bug Fixes

* **azure:** retrieve all sp + secrets ([1d277df](https://github.com/kexa-io/Kexa/commit/1d277dfd85b46c43d0fa5cfe26d1b3650bf16cc3))

## [2.4.3](https://github.com/kexa-io/Kexa/compare/v2.4.2...v2.4.3) (2025-10-17)


### Bug Fixes

* docker set platforms from in cicd ([3e95911](https://github.com/kexa-io/Kexa/commit/3e95911df68f0640160a0d8d21c547ebc5c0013c))

## [2.4.2](https://github.com/kexa-io/Kexa/compare/v2.4.1...v2.4.2) (2025-10-17)


### Bug Fixes

* **dockerfile:** force arm64 ([18420bf](https://github.com/kexa-io/Kexa/commit/18420bff49fc01080fea13acc858e9d310a70a15))

## [2.4.1](https://github.com/kexa-io/Kexa/compare/v2.4.0...v2.4.1) (2025-10-17)


### Bug Fixes

* remove frozen lock ([3cd979d](https://github.com/kexa-io/Kexa/commit/3cd979de1fd3495f66b0cb20538d0f756629a36f))

# Changelog

## [v2.3.5] - 2025-10-02


### Bug Fixes

* **cicd:** setup to node 24 ([5848aa3](https://github.com/kexa-io/Kexa/commit/5848aa365858e9fba358c8d6d6f03f898e565c98))
* **docs:** add samples link ([19ecbfb](https://github.com/kexa-io/Kexa/commit/19ecbfbe96a76d45432409840d121d2656d04404))
* **rules:** AWS & Azure orphans ([c7dc572](https://github.com/kexa-io/Kexa/commit/c7dc57211d6031d8526fa878a2d7700b9a6c4c2a))
* **rules:** aws orphan rules set ([60754cc](https://github.com/kexa-io/Kexa/commit/60754cc43fff27af8566df8b5a94e4929766de35))


### Features

* **rules:** azure & gcp (start) orphaned rules ([6c539ec](https://github.com/kexa-io/Kexa/commit/6c539ec5d2885abe1c4ba5041e323752a21cbba6))
* **rules:** idles resources rules gcp done ([97a13f6](https://github.com/kexa-io/Kexa/commit/97a13f69b7dad134bad42cb285bbad7f73c357ad))

## [2.3.5](https://github.com/kexa-io/Kexa/compare/v2.3.4...v2.3.5) (2025-10-02)


### Bug Fixes

* **kube:** any for kube logs ([3e17caa](https://github.com/kexa-io/Kexa/commit/3e17caa7a60dfd66d71d0554e4ba8e71c838fd42))
* **kube:** remove fixed tailLines ([a1baa8f](https://github.com/kexa-io/Kexa/commit/a1baa8f46bd76315725195969a81b064a90eaa4c))
* **kube:** try no follow for logs stream ([3d7b195](https://github.com/kexa-io/Kexa/commit/3d7b195982344672293f8da50207fa06cb48e5fa))
* test catch log stream errr ([6df1a03](https://github.com/kexa-io/Kexa/commit/6df1a03003f39fbac0ba651a5a32ba8aefe4cfe3))

## [2.3.4](https://github.com/kexa-io/Kexa/compare/v2.3.3...v2.3.4) (2025-10-02)


### Bug Fixes

* **kube:** added catch for abort() + logs ([2394cf5](https://github.com/kexa-io/Kexa/commit/2394cf52f60a267cc71272bb8f6d077f6409d44e))

## [2.3.3](https://github.com/kexa-io/Kexa/compare/v2.3.2...v2.3.3) (2025-10-01)


### Bug Fixes

* **kube:** accept file content & path ([d970f24](https://github.com/kexa-io/Kexa/commit/d970f2455fccff5a74c84662f78841264026ea10))

## [2.3.2](https://github.com/kexa-io/Kexa/compare/v2.3.1...v2.3.2) (2025-10-01)


### Bug Fixes

* **kube:** tls fix + no hpa api instance ([8846f4c](https://github.com/kexa-io/Kexa/commit/8846f4cc348831a1a2c2eb767da3241d967d5542))
* useless line ([190fe37](https://github.com/kexa-io/Kexa/commit/190fe37ffa7bb5c0e93bf8e65e1a2ab9740775d3))

## [2.3.1](https://github.com/kexa-io/Kexa/compare/v2.3.0...v2.3.1) (2025-09-10)


### Bug Fixes

* **github:** bun check + clean id displat ([8c6921c](https://github.com/kexa-io/Kexa/commit/8c6921c347451dbff0a918cb80f3c37f35d932be))

# [2.3.0](https://github.com/kexa-io/Kexa/compare/v2.2.0...v2.3.0) (2025-09-10)


### Features

* **condition:** add IN & NOT_IN (array) and new github pkg gathering ([7dd5ae0](https://github.com/kexa-io/Kexa/commit/7dd5ae0cd40de43a6fc00bb273b63cefa1304f20))

# [2.2.0](https://github.com/kexa-io/Kexa/compare/v2.1.3...v2.2.0) (2025-09-05)


### Bug Fixes

* **api-config:** debug config timing issue ([c68de47](https://github.com/kexa-io/Kexa/commit/c68de47da4aea42a7b70f4ecfdac7e05bf7dc3fb))
* **cicd:** fix cicd & split clean ([b90d0af](https://github.com/kexa-io/Kexa/commit/b90d0af8da5c34f2576d2ac0bda8d7501ae20aa1))
* correct some docs + some tweak to clean old files ([f04fd16](https://github.com/kexa-io/Kexa/commit/f04fd16d3f69f912600fed70a551b80fec9958c9))
* deleted function ([0378c6a](https://github.com/kexa-io/Kexa/commit/0378c6ac0b3d82db6572dd423fa6b032ae3e47b3))
* **docs:** code conduct MDX ([600bae2](https://github.com/kexa-io/Kexa/commit/600bae2b90c015a9dce412279e865cac85877bd7))
* **docs:** docusaurus sidebar order ([0f88beb](https://github.com/kexa-io/Kexa/commit/0f88bebfcce1c91e1f0aac13d1db98ba3106a7f5))
* **docs:** fix title for docusaurus generation ([15c4565](https://github.com/kexa-io/Kexa/commit/15c4565daed5b283989758f30c32d08036f4434a))
* mdx error root readme ([f23cfa1](https://github.com/kexa-io/Kexa/commit/f23cfa19ab3b2b32e1e28e6123d895aabef0954d))
* missing await ([89079c9](https://github.com/kexa-io/Kexa/commit/89079c9a4fd190c81390d35f2e3a4114d02c5864))
* remove debug, await for init ([32b4949](https://github.com/kexa-io/Kexa/commit/32b49491e37513b68ac72bc2e796b14b5329b47e))
* tmp comment to deploy dev image ([421391d](https://github.com/kexa-io/Kexa/commit/421391d2db64c8265a75bf46902e1776f5d2a053))


### Features

* add oracle + https://github.com/kexa-io/Kexa/issues/394 ([270c2ef](https://github.com/kexa-io/Kexa/commit/270c2ef71aa1f74daf70637ea67449b88fe04ea5))
* add working mongodb + docs for all the 3 new addon ([001bd07](https://github.com/kexa-io/Kexa/commit/001bd07e9fd88ef731d909532769d7dca8ef9198))
* new addon working postgresql ([b74187d](https://github.com/kexa-io/Kexa/commit/b74187d44066b31bffac55a0d58ccd9966cd6d5d))
* working display for all elements ([f87c76f](https://github.com/kexa-io/Kexa/commit/f87c76f69b1b0aa32385c358be64c7abc0433f7f))
* working mysql minimal gather ([5d5116a](https://github.com/kexa-io/Kexa/commit/5d5116ad8e4536e2aafd3a269b056303533f96cc))

---
sidebar_position: 10
---

# Changelog

## [v2.1.3] - 2025-06-23



### Bug Fixes

* **api-config:** add HTTP specific parameter ([f1cb4da](https://github.com/kexa-io/Kexa/commit/f1cb4da29f4266f6b5332e49b4f684cb68623708))
* **docs:** case sensitive for docosaurus ([3d0cd12](https://github.com/kexa-io/Kexa/commit/3d0cd12390f4e2252e1b9a886645bf92fd8ba134))
* **docs:** html for MDX + change contact email ([bb12bfa](https://github.com/kexa-io/Kexa/commit/bb12bfaaed315d0a2be7f8eec98ad24d6f06696c))
* **docs:** image tag htlm end ([2c34be3](https://github.com/kexa-io/Kexa/commit/2c34be3c61cf8cc2c391ceeb15838f89e373394e))

# Changelog

## [v2.1.2] - 2025-06-18



### Bug Fixes

* **api-loader:** use boolean var ([6333835](https://github.com/kexa-io/Kexa/commit/633383592681995d7eb6cdbe9d4d59cae6fb0b25))

# Changelog

## [v2.1.1] - 2025-06-17



### Bug Fixes

* **config:** get only save from api for sync ([34bfc68](https://github.com/kexa-io/Kexa/commit/34bfc686ace576e704d1ba57e03562e1eefa56ca))

# Changelog

## [v2.1.0] - 2025-06-17



### Bug Fixes

* **main:** exit -1 on failure ([13158dc](https://github.com/kexa-io/Kexa/commit/13158dc4ba1aa73a8c6f288ede6907389c81873e))
* new save svc ([c879bf0](https://github.com/kexa-io/Kexa/commit/c879bf0300b03f8583ccb949d482dd8b8c537704))
* **save:** fix no return list ([cfa7d16](https://github.com/kexa-io/Kexa/commit/cfa7d16af37a8ffca867b39f28f716108def9e44))


### Features

* **save:** init for premium ([ddc8ae6](https://github.com/kexa-io/Kexa/commit/ddc8ae682e361504e631c9476a4d28abb2854e17))

# Changelog

## [v2.0.9] - 2025-06-13



### Bug Fixes

* **save:** init providerItem on Kexa save ([040a73b](https://github.com/kexa-io/Kexa/commit/040a73bd87a8d9f9f332056b6b03470a6500b8c8))

# Changelog

## [v2.0.8] - 2025-06-10



### Bug Fixes

* **continuous:** fix continuous run & clean exit ([66f6214](https://github.com/kexa-io/Kexa/commit/66f6214584f400fca90a4a0500acf8b45a696644))
* **docs:** azure env names ([87c4361](https://github.com/kexa-io/Kexa/commit/87c4361bf25a7fb1a727d3a47d1afe3f07d90171))
* **docs:** password managers ([1265068](https://github.com/kexa-io/Kexa/commit/1265068953222c0a94d25f18943696296a93f3a4))
* **gcp:** fixed auth flow + pagination warn (mute & fix some) ([33d786d](https://github.com/kexa-io/Kexa/commit/33d786ddcb9017cfde7fe87e1aa7467710a56c32))
* **keyvault:** azure regex for hypens ([58069fe](https://github.com/kexa-io/Kexa/commit/58069fed5d805a11c9537bc9caf4605c59aea142))
* **logs:** add log number resources for rule ([ae94c5f](https://github.com/kexa-io/Kexa/commit/ae94c5fac92743744fde97111f823979b20a019a))
* undefined err and azure rollback ([f909693](https://github.com/kexa-io/Kexa/commit/f909693774df6b1923356cf4e654b28d84dc40bc))

# Changelog

## [v2.0.7] - 2025-06-05



### Bug Fixes

* better err handling for rule dir reading, no INTERFACE mode default ([7bc1a39](https://github.com/kexa-io/Kexa/commit/7bc1a394d8a28028796009d50ce810f533126a22))
* **docs:** remove INTERFACE_CONFIG=false ([d9d23d1](https://github.com/kexa-io/Kexa/commit/d9d23d1df476adb11a0a709fe2cd57dc5e2fa2a1))
* ensure promise wait for all save & exit 0 ([34377b8](https://github.com/kexa-io/Kexa/commit/34377b84f4e8cbc2242218c42d198a99b583e97b))
* handle error as RETURN to avoid index access error ([ea247a2](https://github.com/kexa-io/Kexa/commit/ea247a211999719904d8c0279a35dfb1fded1892))
* **logs:** no warn aws -> debug logs instead ([fd357f9](https://github.com/kexa-io/Kexa/commit/fd357f9a82014ab3895f7fa01b12144b4f6a936d))
* **logs:** remove err download distant rules & global err ([afd07e5](https://github.com/kexa-io/Kexa/commit/afd07e54293ee26aeccfee5e818c2c9e9d4026aa))
* remove version compare code ([2bcd428](https://github.com/kexa-io/Kexa/commit/2bcd428cb3c9c9b75430346554552084eeff5097))

# Changelog

## [v2.0.6] - 2025-06-03



### Bug Fixes

* 4urcloud email sbom actor ([d1e6960](https://github.com/kexa-io/Kexa/commit/d1e696009f355803e40f58e42db959bf7c8cc2db))
* changelog & no branche create ([3182308](https://github.com/kexa-io/Kexa/commit/318230849cdc5682a21176eb0ef63c6b8c0e7fd1))
* create dev push to docker hub ([5533c20](https://github.com/kexa-io/Kexa/commit/5533c20381e6e306e6176bcfd5c14220aa749822))
* no "should upgrade" message ([29c9565](https://github.com/kexa-io/Kexa/commit/29c95654d7e779f2ad99a0484a2d368df55acedb))
* no "should upgrade" message ([ffdc3ed](https://github.com/kexa-io/Kexa/commit/ffdc3ed17b92c8e77207e722a3f487e620e69b27))
* no distant rule download err msg ([88fa606](https://github.com/kexa-io/Kexa/commit/88fa6064f9be3af591f5a06bc1465f99164fce5b))
* no pnpm ([71a0224](https://github.com/kexa-io/Kexa/commit/71a0224cebe58eb39e9ec8c449cc87a52b68eea7))
* remove rule distant gather error ([70f0b2a](https://github.com/kexa-io/Kexa/commit/70f0b2a8d23ac3b30478ae0d6d52c917cdff02b0))
* remove rule distant gather error ([74d54e3](https://github.com/kexa-io/Kexa/commit/74d54e33411b6506a8b8a76ff0d7905501c8e2f7))
* sbom generator to bunjs and push trigger (dev) ([3469e73](https://github.com/kexa-io/Kexa/commit/3469e73fd4157584c56544cb10d3e36feeecb7d1))
* **sbom:** add identity and skip ci ([04bd391](https://github.com/kexa-io/Kexa/commit/04bd391ae0af735f75bb8c161ab1a41bb41fec2b))
* test new ci ([f4b9f1e](https://github.com/kexa-io/Kexa/commit/f4b9f1eb9a98c54a158da3fb82222a300bb70b29))
* update Docker configuration and documentation; add new Dockerfile.light ([3e59779](https://github.com/kexa-io/Kexa/commit/3e5977921664bcb67a91bf109a90f1f148a54120))
* update entry point in dockerstart.sh from index.ts to main.ts ([3077bc0](https://github.com/kexa-io/Kexa/commit/3077bc03d4fe4fbbf896f1e83840af6efa64da56))
* Update GitHub Actions workflow for versioning ([8fcd087](https://github.com/kexa-io/Kexa/commit/8fcd087d0206f762a65e38863b7e00526e8c3111))
* update package.json for run test ([7c2e71c](https://github.com/kexa-io/Kexa/commit/7c2e71c494bce27f676565670796e0254209d80e))

# Changelog

## [v2.0.5] - 2025-05-27



### Bug Fixes

* changelog & no branche create ([b55aae8](https://github.com/kexa-io/Kexa/commit/b55aae879bc88c50a022acd1742eba40d877d720))

## [2.0.4](https://github.com/kexa-io/Kexa/compare/v2.0.3...v2.0.4) (2025-05-27)


### Bug Fixes

* compress all docs images ([bdfbbb8](https://github.com/kexa-io/Kexa/commit/bdfbbb87487e17cd2ab3fda3ea8042fe3a148fab))
* config + notif docs ([4e1c5e8](https://github.com/kexa-io/Kexa/commit/4e1c5e892ea622cc32a90d533c100b23507f76b6))
* disable the function UpdateREADME for test job ([824ac50](https://github.com/kexa-io/Kexa/commit/824ac50661d48d7e5dad13c732b7b78a76a4f263))
* Dockerfile ([59c7f85](https://github.com/kexa-io/Kexa/commit/59c7f85f58a79c5eb9cc9f31a402440181e4faaf))
* docs deploy, getting-started, removed usage (redondant) ([01559fe](https://github.com/kexa-io/Kexa/commit/01559fe404622f482651f895d1e72addd04b7ec0))
* save / export docs & base readme ([db67c9e](https://github.com/kexa-io/Kexa/commit/db67c9ede19b9f20c93710ccc0f51b66a7d8c514))
* test new ci ([eb747e6](https://github.com/kexa-io/Kexa/commit/eb747e69e8948d8b8b45389559858cc0d27d0235))
* update .gitignore ([6322d2c](https://github.com/kexa-io/Kexa/commit/6322d2ca40c7c4f1efcc4ee39261d0eb3dda7091))
* update README ([d388477](https://github.com/kexa-io/Kexa/commit/d3884770183203480e6ee8232a30489b6175a274))
* update sbom ([b5e5e01](https://github.com/kexa-io/Kexa/commit/b5e5e011eda1d1b024ca307580f95aa5956ca91e))

## [2.0.3](https://github.com/kexa-io/Kexa/compare/v2.0.2...v2.0.3) (2025-05-14)


### Bug Fixes

* **cicd:** change git token to app secret ([1c69e76](https://github.com/kexa-io/Kexa/commit/1c69e76097eac22346bd2ce6a8734ee65478aa79))
* retrieve project-trigger link (web interface) ([4c360a0](https://github.com/kexa-io/Kexa/commit/4c360a0a86169601a9bcfc3b5fd7fee66157d27b))

## [2.0.2](https://github.com/kexa-io/Kexa/compare/v2.0.1...v2.0.2) (2025-05-02)


### Bug Fixes

* added api token to API loader services & enum ([88c53c6](https://github.com/kexa-io/Kexa/commit/88c53c6d224aaa1e7529655723be92e31de2a6b6))
* remove ci/cd useless step + fix kexa save from SaaS ([0730c94](https://github.com/kexa-io/Kexa/commit/0730c94ef6c3f1df33e6b373174476b472130805))

## [2.0.1](https://github.com/kexa-io/Kexa/compare/v2.0.0...v2.0.1) (2025-04-30)


### Bug Fixes

* bun lock file ([ebe21d0](https://github.com/kexa-io/Kexa/commit/ebe21d0251cedda36534cf745376817ae808080d))
* fixed bunjs scripts ([da26b2d](https://github.com/kexa-io/Kexa/commit/da26b2d958882d4e4bb462cbc3b3d17d5b3920d8))
* force env var for tests ([4e508db](https://github.com/kexa-io/Kexa/commit/4e508db29dff14982c049e212d646e66df62c1b7))
* move out extractObjectBetween function that trigger update Capability ([6f258f8](https://github.com/kexa-io/Kexa/commit/6f258f8390ec9ec82500443a1e501bb20f3fe763))
* no mocha timeout + import path + remove hardden runner ([3bffd30](https://github.com/kexa-io/Kexa/commit/3bffd30d5e0c56f79133adc01c7b8fe07ed79cbc))
* push new ci, remove older + frozen-lockfile docker ([6056aab](https://github.com/kexa-io/Kexa/commit/6056aab365ffd141a9fc4ba6d98de113a590f8ff))
* re-implement test & update script in bun ([aaf7829](https://github.com/kexa-io/Kexa/commit/aaf782973fad2ec8c045cc6bb047dfa581242969))
* readme new EC2 objects + headers.json for tests ([371695c](https://github.com/kexa-io/Kexa/commit/371695cbb4c18a92cefcab4bc8b1e23b971f69bc))
* remove old ci.yml ([3519a45](https://github.com/kexa-io/Kexa/commit/3519a4579e405eba174b3adeda229736061878c5))
* **saas:** Fixed aws auth in cronicle + header & rules ([8263c26](https://github.com/kexa-io/Kexa/commit/8263c26ae3847cc74039463d451ae88c4f079e1a))
* update cicd for bun ([2907140](https://github.com/kexa-io/Kexa/commit/2907140adb449ec835b39705af4ccc78ed50168a))

## [1.17.5](https://github.com/kexa-io/Kexa/compare/v1.17.4...v1.17.5) (2024-11-29)


### Bug Fixes

* **azure:** display & teams card correct ([8b7b289](https://github.com/kexa-io/Kexa/commit/8b7b28965931e2e190a4ae7aadbe9a6e815b583e))

## [1.17.4](https://github.com/kexa-io/Kexa/compare/v1.17.3...v1.17.4) (2024-11-28)


### Bug Fixes

* **azure:** Application creds, display and MFA policies ([5cff9d2](https://github.com/kexa-io/Kexa/commit/5cff9d2182b6604211b01a6edf2de358038fb522))

## [1.17.3](https://github.com/kexa-io/Kexa/compare/v1.17.2...v1.17.3) (2024-11-27)


### Bug Fixes

* **workspace:** authorize file auth ([0f753d3](https://github.com/kexa-io/Kexa/commit/0f753d345a39b91ea7972982faede5cb5b066570))

## [1.17.2](https://github.com/kexa-io/Kexa/compare/v1.17.1...v1.17.2) (2024-11-27)


### Bug Fixes

* Workspace Auth with SP ([b0f8fde](https://github.com/kexa-io/Kexa/commit/b0f8fde88fcf56964e5e7b72ccbe7fc1396b57bd))
* **workspace:** environment var for admin mail ([0c79fb1](https://github.com/kexa-io/Kexa/commit/0c79fb1cac707056f863e78008ef8d6a5093a08f))

## [1.17.1](https://github.com/kexa-io/Kexa/compare/v1.17.0...v1.17.1) (2024-10-24)


### Bug Fixes

* resync versions docker hub ([0b2668d](https://github.com/kexa-io/Kexa/commit/0b2668dd85273f6b8e9f318fc248f2f131b5e86b))

# [1.4.0](https://github.com/kexa-io/Kexa/compare/v1.3.0...v1.4.0) (2024-10-24)


### Bug Fixes

* actions/upload-artifact version ([273b58e](https://github.com/kexa-io/Kexa/commit/273b58ecc448d9713d4ac5e122654ee69fffaa62))
* add display service for fuzzing addon ([bf4a69b](https://github.com/kexa-io/Kexa/commit/bf4a69b47bcfb02933175b2b11ad44fe78df5bdc))
* added changelog & npm module to semantic ([5ee2b6f](https://github.com/kexa-io/Kexa/commit/5ee2b6fdde56ae663b21a3df3d1bf7ed8fc37189))
* CI version add-and-commit ([b64bef2](https://github.com/kexa-io/Kexa/commit/b64bef25caae32268c7566c104f774bf99c74d98))
* condition for no encrypt config ([b57d2b7](https://github.com/kexa-io/Kexa/commit/b57d2b744827e45995ffedb62547b68d14add815))
* display service 'undefined' properties ([7b66554](https://github.com/kexa-io/Kexa/commit/7b6655468cacdbd877963331ff3bfeeda8c4ff12))
* escape all in header ([a8df508](https://github.com/kexa-io/Kexa/commit/a8df508d6115ea04a30f28a3e86ed1450338a993))
* get version of new url (transfer repo) ([d6ebadf](https://github.com/kexa-io/Kexa/commit/d6ebadf7bd818b920c61a3a3e19425b892163771))
* missing file from last push ([cd753c6](https://github.com/kexa-io/Kexa/commit/cd753c68e52cf897f2106555d98d776f210a288e))
* new versioning ok ([fb6103f](https://github.com/kexa-io/Kexa/commit/fb6103fb1528b5b1873d0684e675aee45f2bf537))
* no legacy-peer-dep ([bdd6970](https://github.com/kexa-io/Kexa/commit/bdd6970f5258d7236b653687b32f34c987995fc4))
* npm pkg name ([b9fd49c](https://github.com/kexa-io/Kexa/commit/b9fd49cc078eb99f84075882a740fa23165591f9))
* pnpm ([2838a5e](https://github.com/kexa-io/Kexa/commit/2838a5e10205d3add5376ad4d94ba434afa2fcb8))
* protect inject regex ([1a08021](https://github.com/kexa-io/Kexa/commit/1a0802154b897284657cfd7c86916bd08c1a63db))
* sast supported language ([93ebbd6](https://github.com/kexa-io/Kexa/commit/93ebbd61d46284a59edb69e39ff56dcb5bf5d56b))
* trigger versioning ([969dbf9](https://github.com/kexa-io/Kexa/commit/969dbf95424f0df2c3f5f596779ce3b779d0e6b8))
* triggering ([74698aa](https://github.com/kexa-io/Kexa/commit/74698aa30955dfbf6ba40f4ad9fdf033d374298e))
* typo cicd ([1af054a](https://github.com/kexa-io/Kexa/commit/1af054a097704ccba8371a0f93a1a01ae64c8c66))
* typo error in CI/CD ([4a29ce7](https://github.com/kexa-io/Kexa/commit/4a29ce75594b18af8d1ba1fbcc51b90e09e42df6))
* url for rules gathering ([d8a3fe2](https://github.com/kexa-io/Kexa/commit/d8a3fe2f907ae6acee57ad574be5f63acfa52d59))
* version cicd trigger ([205065a](https://github.com/kexa-io/Kexa/commit/205065a6fc721731f6a606f97413feb5d49fe791))
* versioning bypass peer deps ([954efd9](https://github.com/kexa-io/Kexa/commit/954efd98ebeafb91dc0263c478a9e14d448f84fe))
* wrong concat ([6284d55](https://github.com/kexa-io/Kexa/commit/6284d55c4cd85c9718ebaa8bbfe419d764025634))


### Features

* Add configuration, rules & credentials from API ([691f533](https://github.com/kexa-io/Kexa/commit/691f533498e1f7b3442a7af8d2a5ff64528f281d))
* adding continuous run ([bcff88f](https://github.com/kexa-io/Kexa/commit/bcff88f1288f1ec0caffe31cf05720f6770ea867))
* Jira alerting & Correcting versioning ([9df9369](https://github.com/kexa-io/Kexa/commit/9df9369478ee02b8d35ed9c49d382c985065c3ff))
* Jira alerting & Correcting versioning ([34141c7](https://github.com/kexa-io/Kexa/commit/34141c71b31762aa5af0fa08cc90f2f90be8276a))
* Jira alerting & Correcting versioning ([fb07922](https://github.com/kexa-io/Kexa/commit/fb07922ca183937a70f45f2e2a72bb8e09182c04))
* Jira alerting & Correcting versioning ([a8fb84b](https://github.com/kexa-io/Kexa/commit/a8fb84b19110d9f53bcc82d9cbcfa4d5363ad74a))
* Postgres Addon (export & save) ([ca23c01](https://github.com/kexa-io/Kexa/commit/ca23c016cadf9572e796deeb883e287ee54d0fc7))
* SAST & Versioning ([53f992f](https://github.com/kexa-io/Kexa/commit/53f992f3972e97260d7ef4dd929f6d18df4f2ce4))

# CHANGELOG

## 1.8.0-SNAPSHOT.51.f9fa354

### Files added: 2

CHANGELOG.md was added

VERSION was added

### Files changed: 5

CHANGELOG.md was changed

VERSION was changed

.github/workflows/ci.yml was changed

Kexa/services/updateCapability.service.ts was changed

package.json was changed


## 1.8.0-SNAPSHOT.53.56373d8

### Files added: 0

### Files changed: 10

Kexa/rules/Deployement.yaml was changed

Kexa/rules/Economy.yaml was changed

Kexa/rules/HTTPRules.yaml was changed

Kexa/rules/OperationalExcellence.yaml was changed

Kexa/rules/Performance.yaml was changed

Kexa/rules/PostDeployement.yaml was changed

Kexa/rules/PreDeployement.yaml was changed

Kexa/rules/Security.yaml was changed

Kexa/rules/driveRules.yaml was changed

Kexa/rules/rules-testing.yaml was changed


## 1.8.0-SNAPSHOT.55.c3f6d1b

### Files added: 0

### Files changed: 1

README.md was changed


## 1.8.0-SNAPSHOT.58.885a664

### Files added: 0

### Files changed: 6

Kexa/rules/Economy.yaml was changed

Kexa/rules/OperationalExcellence.yaml was changed

Kexa/rules/Performance.yaml was changed

Kexa/rules/Security.yaml was changed

Kexa/rules/rules-testing.yaml was changed

README.md was changed


## 1.8.0-SNAPSHOT.61.b5ef343

### Files added: 1

images/schema-engine.png was added

### Files changed: 2

images/schema-engine.png was changed

documentation/Documentation-Kexa.md was changed


## 1.8.0-SNAPSHOT.67.e122e26

### Files added: 0

### Files changed: 14

.gitignore was changed

Kexa/emails/emails.ts was changed

Kexa/helpers/files.ts was changed

Kexa/main.ts was changed

Kexa/models/resultScan.models.ts was changed

Kexa/models/settingFile/rules.models.ts was changed

Kexa/rules/Deployement.yaml was changed

Kexa/services/alerte.service.ts was changed

Kexa/services/analyse.service.ts was changed

Kexa/services/display.service.ts was changed

README.md was changed

config/default.json was changed

documentation/Documentation-Kexa.md was changed

package.json was changed


## 1.8.0-SNAPSHOT.69.12ed96c

### Files added: 0

### Files changed: 8

Kexa/services/addOn/awsGathering.service.ts was changed

Kexa/services/addOn/azureGathering.service.ts was changed

Kexa/services/addOn/gcpGathering.service.ts was changed

Kexa/services/addOn/githubGathering.service.ts was changed

Kexa/services/addOn/googleDriveGathering.service.ts was changed

Kexa/services/addOn/googleWorkspaceGathering.service.ts was changed

Kexa/services/addOn/kubernetesGathering.service.ts was changed

Kexa/services/addOn/o365Gathering.service.ts was changed


## 1.8.0-SNAPSHOT.76.2e20887

### Files added: 0

### Files changed: 1

Kexa/services/addOn/o365Gathering.service.ts was changed


## 1.8.0-SNAPSHOT.80.a324899

### Files added: 0

### Files changed: 2

README.md was changed

documentation/Documentation-Kexa.md was changed


## 1.8.0-SNAPSHOT.91.b5c4d86

### Files added: 0

### Files changed: 3

Kexa/services/analyse.service.ts was changed

config/env/office365.json was changed

documentation/Documentation-Kexa.md was changed


## 1.8.0-SNAPSHOT.93.aa30113

### Files added: 1

config/default.json was added

### Files changed: 1

config/default.json was changed


## 1.8.0-SNAPSHOT.98.874b280

### Files added: 0

### Files changed: 5

Kexa/models/azure/resource.models.ts was changed

Kexa/rules/OperationalExcellence.yaml was changed

Kexa/services/addOn/azureGathering.service.ts was changed

package-lock.json was changed

package.json was changed


## 1.8.0-SNAPSHOT.100.29206c4

### Files added: 0

### Files changed: 1

README.md was changed


## 1.8.0-SNAPSHOT.102.b8694e9

### Files added: 0

### Files changed: 3

.gitignore was changed

documentation/Documentation-Kexa.md was changed


## 1.8.0-SNAPSHOT.109.96001d8

### Files added: 10

Kexa/rules/rulesByProvider/awsSetRules.yaml was added

Kexa/rules/rulesByProvider/azureSetRules.yaml was added

Kexa/rules/rulesByProvider/gcpSetRules.yaml was added

Kexa/rules/rulesByProvider/githubSetRules.yaml was added

Kexa/rules/rulesByProvider/googleDriveSetRules.yaml was added

Kexa/rules/rulesByProvider/googleWorkspaceSetRules.yaml was added

Kexa/rules/rulesByProvider/httpSetRules.yaml was added

Kexa/rules/rulesByProvider/kubernetesSetRules.yaml was added

Kexa/rules/rulesByProvider/o365SetRules.yaml was added

initKexa.ps1 was added

### Files changed: 14

Kexa/rules/rulesByProvider/awsSetRules.yaml was changed

Kexa/rules/rulesByProvider/azureSetRules.yaml was changed

Kexa/rules/rulesByProvider/gcpSetRules.yaml was changed

Kexa/rules/rulesByProvider/githubSetRules.yaml was changed

Kexa/rules/rulesByProvider/googleDriveSetRules.yaml was changed

Kexa/rules/rulesByProvider/googleWorkspaceSetRules.yaml was changed

Kexa/rules/rulesByProvider/httpSetRules.yaml was changed

Kexa/rules/rulesByProvider/kubernetesSetRules.yaml was changed

Kexa/rules/rulesByProvider/o365SetRules.yaml was changed

initKexa.ps1 was changed

Kexa/services/analyse.service.ts was changed

README.md was changed

config/default.json was changed

documentation/Documentation-Kexa.md was changed


## 1.8.0-SNAPSHOT.111.ef2090d

### Files added: 0

### Files changed: 1

initKexa.ps1 was changed


## 1.8.0-SNAPSHOT.113.3054896

### Files added: 0

### Files changed: 1

README.md was changed


## 1.8.0-SNAPSHOT.118.4150a43

### Files added: 0

### Files changed: 3

Kexa/services/addOn/azureGathering.service.ts was changed

Kexa/services/analyse.service.ts was changed

initKexa.ps1 was changed


## 1.8.0-SNAPSHOT.124.7d39677

### Files added: 0

### Files changed: 2

.gitignore was changed

initKexa.ps1 was changed


## 1.8.0-SNAPSHOT.127.e802885

### Files added: 0

### Files changed: 3

Kexa/rules/OperationalExcellence.yaml was changed

Kexa/services/addOn/azureGathering.service.ts was changed

Kexa/services/addOn/display/azureDisplay.service.ts was changed


## 1.8.0-SNAPSHOT.129.168f9b5

### Files added: 0

### Files changed: 2

README.md was changed

documentation/Documentation-Kexa.md was changed


## 1.8.0-SNAPSHOT.132.427091f

### Files added: 0

### Files changed: 1

README.md was changed


## 1.8.0-SNAPSHOT.135.a605443

### Files added: 0

### Files changed: 1

README.md was changed


## 1.10.0-SNAPSHOT.25.9ee4861

### Files added: 0

### Files changed: 0


## 1.10.0-SNAPSHOT.29.a6375e2

### Files added: 0

### Files changed: 13

Kexa/main.ts was changed

Kexa/models/settingFile/config.models.ts was changed

Kexa/services/addOn.service.ts was changed

Kexa/services/addOn/awsGathering.service.ts was changed

Kexa/services/addOn/azureGathering.service.ts was changed

Kexa/services/addOn/gcpGathering.service.ts was changed

Kexa/services/addOn/githubGathering.service.ts was changed

Kexa/services/addOn/googleWorkspaceGathering.service.ts was changed

Kexa/services/addOn/kubernetesGathering.service.ts was changed

Kexa/services/addOn/o365Gathering.service.ts was changed

Kexa/services/analyse.service.ts was changed

config/default.json was changed

documentation/Documentation-Kexa.md was changed


## 1.10.0-SNAPSHOT.31.b2209bd

### Files added: 0

### Files changed: 1

package-lock.json was changed


## 1.10.0-SNAPSHOT.34.fd4abd2

### Files added: 3

Kexa/emails/teams.ts was added

Kexa/helpers/extractURL.ts was added

Kexa/helpers/spliter.ts was added

### Files changed: 8

Kexa/emails/teams.ts was changed

Kexa/helpers/extractURL.ts was changed

Kexa/helpers/spliter.ts was changed

Kexa/services/alerte.service.ts was changed

Kexa/services/analyse.service.ts was changed

documentation/Documentation-Kexa.md was changed

package-lock.json was changed

package.json was changed


## 1.10.0-SNAPSHOT.40.9bbdd02

### Files added: 1

Kexa/helpers/statsNumbers.ts was added

### Files changed: 8

Kexa/helpers/statsNumbers.ts was changed

Kexa/main.ts was changed

Kexa/rules/Economy.yaml was changed

Kexa/services/addOn/azureGathering.service.ts was changed

config/default.json was changed

documentation/AWS.md was changed

package-lock.json was changed

package.json was changed


## 1.10.0-SNAPSHOT.43.240dfb5

### Files added: 0

### Files changed: 7

Kexa/main.ts was changed

Kexa/models/git/resource.models.ts was changed

Kexa/rules/rulesByProvider/azureSetRules.yaml was changed

Kexa/rules/rulesByProvider/githubSetRules.yaml was changed

Kexa/services/addOn/azureGathering.service.ts was changed

Kexa/services/addOn/githubGathering.service.ts was changed

initKexa.ps1 was changed


## 1.10.0-SNAPSHOT.49.f377902

### Files added: 1

Kexa/rules/Kubernete.yaml was added

### Files changed: 7

Kexa/rules/Kubernete.yaml was changed

.gitignore was changed

Kexa/models/kubernetes/kubernetes.models.ts was changed

Kexa/services/addOn/kubernetesGathering.service.ts was changed

config/default.json was changed

package-lock.json was changed

package.json was changed


## 1.10.0-SNAPSHOT.55.9b06f0e

### Files added: 0

### Files changed: 9

Kexa/models/kubernetes/kubernetes.models.ts was changed

Kexa/rules/rulesByProvider/githubSetRules.yaml was changed

Kexa/rules/rulesByProvider/httpSetRules.yaml was changed

Kexa/services/addOn/kubernetesGathering.service.ts was changed

Kexa/services/updateCapability.service.ts was changed

README.md was changed

capacity.json was changed

package-lock.json was changed

package.json was changed


## 1.10.0-SNAPSHOT.64.d9252e8

### Files added: 0

### Files changed: 8

Kexa/main.ts was changed

Kexa/models/http/config.models.ts was changed

Kexa/models/kubernetes/kubernetes.models.ts was changed

Kexa/services/addOn/httpGathering.service.ts was changed

Kexa/services/addOn/kubernetesGathering.service.ts was changed

config/demo/http.default.json was changed

package-lock.json was changed

package.json was changed


## 1.10.0-SNAPSHOT.67.797e29c

### Files added: 1

Kexa/helpers/latestVersion.ts was added

### Files changed: 2

Kexa/helpers/latestVersion.ts was changed

Kexa/main.ts was changed


## 1.10.2-SNAPSHOT.28.119321d

### Files added: 0

### Files changed: 1

documentation/Documentation-Kexa.md was changed


## 1.11.0-SNAPSHOT.40.d73b9e6

### Files added: 0

### Files changed: 1

capacity.json was changed


## 1.11.0-SNAPSHOT.43.78eb25e

### Files added: 0

### Files changed: 1

Kexa/services/addOn/azureGathering.service.ts was changed


## 1.11.0-SNAPSHOT.49.cde3daf

### Files added: 0

### Files changed: 10

Kexa/models/azure/resource.models.ts was changed

Kexa/rules/Economy.yaml was changed

Kexa/rules/OperationalExcellence.yaml was changed

Kexa/rules/Performance.yaml was changed

Kexa/rules/Security.yaml was changed

Kexa/rules/rules-testing.yaml was changed

Kexa/rules/rulesByProvider/azureSetRules.yaml was changed

Kexa/services/addOn/azureGathering.service.ts was changed

Kexa/services/updateCapability.service.ts was changed


## 1.11.0-SNAPSHOT.52.0e3b498

### Files added: 0

### Files changed: 1

Kexa/services/addOn/azureGathering.service.ts was changed


## 1.11.0-SNAPSHOT.55.bdc5559

### Files added: 0

### Files changed: 2

Kexa/helpers/latestVersion.ts was changed

Kexa/services/addOn/azureGathering.service.ts was changed


## 1.11.0-SNAPSHOT.59.7e61738

### Files added: 0

### Files changed: 4

Kexa/services/manageVarEnvironnement.service.ts was changed

documentation/Documentation-Kexa.md was changed

package-lock.json was changed

package.json was changed


## 1.11.1-SNAPSHOT.5.94bca52

### Files added: 0

### Files changed: 0


## 1.12.0-SNAPSHOT.11.f8eceed

### Files added: 2

Kexa/helpers/dowloadFile.ts was added

config/demo/exemple4.default.json was added

### Files changed: 8

Kexa/helpers/dowloadFile.ts was changed

config/demo/exemple4.default.json was changed

Kexa/main.ts was changed

Kexa/rules/rules-testing.yaml was changed

Kexa/services/analyse.service.ts was changed

documentation/Documentation-Kexa.md was changed

package-lock.json was changed

package.json was changed


## 1.12.0-SNAPSHOT.17.bc4bd72

### Files added: 0

### Files changed: 2

Kexa/__tests__/services/addOn.test.ts was changed

Kexa/__tests__/services/analyse.test.ts was changed


## 1.12.0-SNAPSHOT.19.3049a4a

### Files added: 0

### Files changed: 2

Dockerfile was changed

package-lock.json was changed


## 1.12.0-SNAPSHOT.25.6a978ff

### Files added: 23

Kexa/models/export/mysql/config.models.ts was added

Kexa/query/CRUD/origins.iquery.ts was added

Kexa/query/CRUD/providerItems.iquery.ts was added

Kexa/query/CRUD/providers.iquery.ts was added

Kexa/query/CRUD/resources.iquery.ts was added

Kexa/query/CRUD/rules.iquery.ts was added

Kexa/query/CRUD/scans.iquery.ts was added

Kexa/query/table.iquery.ts was added

Kexa/services/addOn/exportation/azureBlobStorageExportation.service.ts was added

Kexa/services/addOn/exportation/mongoDBExportation.service.ts was added

Kexa/services/addOn/exportation/mySQLExportation.service.ts was added

Kexa/services/addOn/save/mySQLSave.service.ts was added

Kexa/services/exportation.service.ts was added

Kexa/services/saving/azureBlobStorage.service.ts was added

Kexa/services/saving/mongoDB.service.ts was added

Kexa/services/saving/mySQL.service.ts was added

config/demo/exemple5.default.json was added

config/demo/mySQL.default.json was added

config/freshTemplatesAddOn/XXXExportation.service.ts was added

config/freshTemplatesAddOn/XXXSave.service.ts was added

documentation/save/MySQL.md was added

images/MySQL-logo.png was added

images/schema-UML-SQL.png was added

### Files changed: 38

Kexa/models/export/mysql/config.models.ts was changed

Kexa/query/CRUD/origins.iquery.ts was changed

Kexa/query/CRUD/providerItems.iquery.ts was changed

Kexa/query/CRUD/providers.iquery.ts was changed

Kexa/query/CRUD/resources.iquery.ts was changed

Kexa/query/CRUD/rules.iquery.ts was changed

Kexa/query/CRUD/scans.iquery.ts was changed

Kexa/query/table.iquery.ts was changed

Kexa/services/addOn/exportation/azureBlobStorageExportation.service.ts was changed

Kexa/services/addOn/exportation/mongoDBExportation.service.ts was changed

Kexa/services/addOn/exportation/mySQLExportation.service.ts was changed

Kexa/services/addOn/save/mySQLSave.service.ts was changed

Kexa/services/exportation.service.ts was changed

Kexa/services/saving/azureBlobStorage.service.ts was changed

Kexa/services/saving/mongoDB.service.ts was changed

Kexa/services/saving/mySQL.service.ts was changed

config/demo/exemple5.default.json was changed

config/demo/mySQL.default.json was changed

config/freshTemplatesAddOn/XXXExportation.service.ts was changed

config/freshTemplatesAddOn/XXXSave.service.ts was changed

documentation/save/MySQL.md was changed

images/MySQL-logo.png was changed

images/schema-UML-SQL.png was changed

Kexa/main.ts was changed

Kexa/models/export/azureBlobStorage/config.models.ts was changed

Kexa/services/addOn.service.ts was changed

Kexa/services/addOn/azureGathering.service.ts was changed

Kexa/services/addOn/save/azureBlobStorageSave.service.ts was changed

Kexa/services/addOn/save/mongoDBSave.service.ts was changed

Kexa/services/analyse.service.ts was changed

Kexa/services/save.service.ts was changed

config/default.json was changed

config/demo/exemple3.default.json was changed

documentation/Documentation-Kexa.md was changed

function.json was changed

host.json was changed

package-lock.json was changed

package.json was changed


## 1.12.0-SNAPSHOT.27.b972da9

### Files added: 0

### Files changed: 1

README.md was changed


## 1.12.0-SNAPSHOT.30.bcfe35d

### Files added: 0

### Files changed: 3

Kexa/services/addOn/azureGathering.service.ts was changed

package-lock.json was changed

package.json was changed


## 1.12.0-SNAPSHOT.32.7c2677b

### Files added: 0

### Files changed: 1

.github/workflows/ci.yml was changed


## 1.12.0-SNAPSHOT.34.78cb84a

### Files added: 0

### Files changed: 1

Kexa/services/addOn/azureGathering.service.ts was changed


## 1.12.0-SNAPSHOT.36.6b1305c

### Files added: 0

### Files changed: 1

Kexa/services/analyse.service.ts was changed

## 1.12.0-SNAPSHOT.58.7d0768c

### Files added: 0

### Files changed: 4

Kexa/__tests__/rules/test1/rule-test.yaml was changed

Kexa/__tests__/rules/test2/rule-test.yaml was changed

Kexa/__tests__/rules/test2/rule-test2.yaml was changed

Kexa/__tests__/rules/test3/rule-test.yaml was changed


## 1.12.2-SNAPSHOT.28.6ef96c9

### Files added: 0

### Files changed: 1

package-lock.json was changed


## 1.12.2-SNAPSHOT.30.2d3d2cb

### Files added: 1

Kexa/rules/rules-with-var.yaml was added

### Files changed: 4

Kexa/rules/rules-with-var.yaml was changed

.github/ISSUE_TEMPLATE/bug_report.md was changed

.github/ISSUE_TEMPLATE/feature_request.md was changed

package-lock.json was changed


## 1.12.2-SNAPSHOT.33.8b1176f

### Files added: 10

.github/ISSUE_TEMPLATE/bug_report.md was added

.github/ISSUE_TEMPLATE/feature_request.md was added

CODE_OF_CONDUCT.md was added

CONTRIBUTING.md was added

Kexa/rules/awsSetRules.yaml was added

Kexa/rules/rules-with-var.yaml was added

Kexa/services/addOn/imports/awsPackage.import.ts was added

Kexa/services/addOn/imports/scripts/awsPackageInstall.script.sh was added

Kexa/services/addOn/imports/scripts/azurePackageInstall.script.sh was added

SECURITY.md was added

### Files changed: 35

.github/ISSUE_TEMPLATE/bug_report.md was changed

.github/ISSUE_TEMPLATE/feature_request.md was changed

CODE_OF_CONDUCT.md was changed

CONTRIBUTING.md was changed

Kexa/rules/awsSetRules.yaml was changed

Kexa/rules/rules-with-var.yaml was changed

Kexa/services/addOn/imports/awsPackage.import.ts was changed

Kexa/services/addOn/imports/scripts/awsPackageInstall.script.sh was changed

Kexa/services/addOn/imports/scripts/azurePackageInstall.script.sh was changed

SECURITY.md was changed

.github/workflows/ci.yml was changed

CHANGELOG.md was changed

Kexa/__tests__/rules/test1/rule-test.yaml was changed

Kexa/__tests__/rules/test2/rule-test.yaml was changed

Kexa/__tests__/rules/test2/rule-test2.yaml was changed

Kexa/__tests__/rules/test3/rule-test.yaml was changed

Kexa/models/aws/config.models.ts was changed

Kexa/models/aws/ressource.models.ts was changed

Kexa/rules/Economy.yaml was changed

Kexa/rules/OperationalExcellence.yaml was changed

Kexa/rules/Security.yaml was changed

Kexa/rules/rulesByProvider/awsSetRules.yaml was changed

Kexa/services/addOn/awsGathering.service.ts was changed

Kexa/services/addOn/azureGathering.service.ts was changed

Kexa/services/addOn/display/awsDisplay.service.ts was changed

Kexa/services/addOn/imports/azurePackage.import.ts was changed

Kexa/services/addOn/save/amazonS3Save.service.ts was changed

Kexa/services/analyse.service.ts was changed

Kexa/services/manageVarEnvironnement.service.ts was changed

Kexa/services/updateCapability.service.ts was changed

README.md was changed

VERSION was changed

capacity.json was changed

package-lock.json was changed

package.json was changed


## 1.12.2-SNAPSHOT.40.a175873

### Files added: 0

### Files changed: 6

Kexa/services/addOn/awsGathering.service.ts was changed

Kexa/services/addOn/azureGathering.service.ts was changed

Kexa/services/updateCapability.service.ts was changed

capacity.json was changed

package-lock.json was changed

package.json was changed


## 1.12.2-SNAPSHOT.44.d9a12a1

### Files added: 10

.github/ISSUE_TEMPLATE/bug_report.md was added

.github/ISSUE_TEMPLATE/feature_request.md was added

CODE_OF_CONDUCT.md was added

CONTRIBUTING.md was added

Kexa/rules/awsSetRules.yaml was added

Kexa/rules/rules-with-var.yaml was added

Kexa/services/addOn/imports/awsPackage.import.ts was added

Kexa/services/addOn/imports/scripts/awsPackageInstall.script.sh was added

Kexa/services/addOn/imports/scripts/azurePackageInstall.script.sh was added

SECURITY.md was added

### Files changed: 37

.github/ISSUE_TEMPLATE/bug_report.md was changed

.github/ISSUE_TEMPLATE/feature_request.md was changed

CODE_OF_CONDUCT.md was changed

CONTRIBUTING.md was changed

Kexa/rules/awsSetRules.yaml was changed

Kexa/rules/rules-with-var.yaml was changed

Kexa/services/addOn/imports/awsPackage.import.ts was changed

Kexa/services/addOn/imports/scripts/awsPackageInstall.script.sh was changed

Kexa/services/addOn/imports/scripts/azurePackageInstall.script.sh was changed

SECURITY.md was changed

.github/workflows/ci.yml was changed

CHANGELOG.md was changed

Kexa/__tests__/rules/test1/rule-test.yaml was changed

Kexa/__tests__/rules/test2/rule-test.yaml was changed

Kexa/__tests__/rules/test2/rule-test2.yaml was changed

Kexa/__tests__/rules/test3/rule-test.yaml was changed

Kexa/__tests__/services/updateCapability.test.ts was changed

Kexa/models/aws/config.models.ts was changed

Kexa/models/aws/ressource.models.ts was changed

Kexa/rules/Economy.yaml was changed

Kexa/rules/OperationalExcellence.yaml was changed

Kexa/rules/Security.yaml was changed

Kexa/rules/rulesByProvider/awsSetRules.yaml was changed

Kexa/services/addOn/awsGathering.service.ts was changed

Kexa/services/addOn/azureGathering.service.ts was changed

Kexa/services/addOn/display/awsDisplay.service.ts was changed

Kexa/services/addOn/imports/azurePackage.import.ts was changed

Kexa/services/addOn/save/amazonS3Save.service.ts was changed

Kexa/services/analyse.service.ts was changed

Kexa/services/manageVarEnvironnement.service.ts was changed

Kexa/services/updateCapability.service.ts was changed

README.md was changed

VERSION was changed

capacity.json was changed

documentation/Documentation-Kexa.md was changed

package-lock.json was changed

package.json was changed


## 1.13.0-dependabotnpmandyarnfollowredi.47.f89bb35
## 1.12.2-SNAPSHOT.47.98d29cd

### Files added: 0

### Files changed: 1

package-lock.json was changed


## 1.13.0-dependabotnpmandyarnnodemailer.50.0cce912

### Files added: 0

### Files changed: 2

documentation/Documentation-Kexa.md was changed


## 1.12.2-SNAPSHOT.51.6431447

### Files added: 1

Kexa/rules/awsBenchmarkRules.yaml was added

### Files changed: 2

Kexa/rules/awsBenchmarkRules.yaml was changed

Kexa/services/addOn/awsGathering.service.ts was changed


## 1.12.2-SNAPSHOT.54.145d9f9

### Files added: 0

### Files changed: 1

Kexa/rules/awsBenchmarkRules.yaml was changed


## 1.12.2-SNAPSHOT.57.9ec508d

### Files added: 0

### Files changed: 1

Kexa/rules/awsBenchmarkRules.yaml was changed


## 1.12.2-SNAPSHOT.59.a530fc6

### Files added: 1

ROADMAP.md was added

### Files changed: 1

ROADMAP.md was changed


## 1.12.2-SNAPSHOT.62.8a7a340

### Files added: 2

MAINTAINERS.md was added

RESPONSIBILITIES.md was added

### Files changed: 2

MAINTAINERS.md was changed

RESPONSIBILITIES.md was changed


## 1.12.2-SNAPSHOT.68.be1133c

### Files added: 2

Kexa/rules/AwsComplianceSetRules.yaml was added

Kexa/rules/AzureComplianceSetRules.yaml was added

### Files changed: 9

Kexa/rules/AwsComplianceSetRules.yaml was changed

Kexa/rules/AzureComplianceSetRules.yaml was changed

CHANGELOG.md was changed

Kexa/models/aws/ressource.models.ts was changed

Kexa/services/addOn/awsGathering.service.ts was changed

Kexa/services/addOn/azureGathering.service.ts was changed

README.md was changed

VERSION was changed

config/default.json was changed


## 1.12.2-devadrienawsauth.73.41f5ced

### Files added: 1

Kexa/rules/GcpComplianceSetRules.yaml was added

### Files changed: 9

Kexa/rules/GcpComplianceSetRules.yaml was changed

Kexa/models/gcp/resource.models.ts was changed

Kexa/rules/AwsComplianceSetRules.yaml was changed

Kexa/rules/AzureComplianceSetRules.yaml was changed

Kexa/services/addOn/azureGathering.service.ts was changed

Kexa/services/addOn/gcpGathering.service.ts was changed

capacity.json was changed

package-lock.json was changed

package.json was changed


## 1.12.2-SNAPSHOT.75.d947268

### Files added: 1

Kexa/rules/GcpComplianceSetRules.yaml was added

### Files changed: 12

Kexa/rules/GcpComplianceSetRules.yaml was changed

CHANGELOG.md was changed

Kexa/models/gcp/resource.models.ts was changed

Kexa/rules/AwsComplianceSetRules.yaml was changed

Kexa/rules/AzureComplianceSetRules.yaml was changed

Kexa/services/addOn/azureGathering.service.ts was changed

Kexa/services/addOn/gcpGathering.service.ts was changed

README.md was changed

VERSION was changed

capacity.json was changed

package-lock.json was changed

package.json was changed


## 1.13.0-dependabotnpmandyarnjose4155.53.d16c734

### Files added: 0

### Files changed: 1

package-lock.json was changed


## 1.13.1-dependabotnpmandyarnfollowredi.1.8bf4e04

### Files added: 0

### Files changed: 1

package-lock.json was changed

## 1.13.0-SNAPSHOT.92.e733089

### Files added: 0

### Files changed: 6

CHANGELOG.md was changed

LICENCE.txt was changed

README.md was changed

VERSION was changed

package-lock.json was changed

package.json was changed

## 1.13.2-testpnpm.4.15cbed8

### Files added: 1

pnpm-lock.yaml was added

### Files changed: 7

pnpm-lock.yaml was changed

.github/workflows/ci.yml was changed

Dockerfile was changed

README.md was changed

documentation/Documentation-Kexa.md was changed

## 1.13.1-SNAPSHOT.7.d659914

### Files added: 0

### Files changed: 5

CHANGELOG.md was changed

Kexa/services/updateCapability.service.ts was changed

VERSION was changed

package-lock.json was changed

package.json was changed


## 1.13.2-testpnpm.9.320e27e

### Files added: 1

pnpm-lock.yaml was added

### Files changed: 11

pnpm-lock.yaml was changed

.github/workflows/ci.yml was changed

CHANGELOG.md was changed

Dockerfile was changed

Kexa/services/updateCapability.service.ts was changed

README.md was changed

VERSION was changed

capacity.json was changed

documentation/Documentation-Kexa.md was changed

package-lock.json was changed

package.json was changed


## 1.14.0-SNAPSHOT.11.a6d1c0e

### Files added: 1

pnpm-lock.yaml was added

### Files changed: 10

pnpm-lock.yaml was changed

.github/workflows/ci.yml was changed

CHANGELOG.md was changed

Dockerfile was changed

Kexa/services/updateCapability.service.ts was changed

README.md was changed

VERSION was changed

documentation/Documentation-Kexa.md was changed

package-lock.json was changed

package.json was changed

## 1.14.0-devestebanexportsaasaddon.15.d3d1bf9

### Files added: 5

Kexa/models/export/kexa/config.model.ts was added

Kexa/services/addOn/exportation/kexaExportation.service.ts was added

Kexa/services/addOn/save/kexaSave.service.ts was added

config/demo/kexa.default.json was added

documentation/save/Kexa.md was added

### Files changed: 13

Kexa/models/export/kexa/config.model.ts was changed

Kexa/services/addOn/exportation/kexaExportation.service.ts was changed

Kexa/services/addOn/save/kexaSave.service.ts was changed

config/demo/kexa.default.json was changed

documentation/save/Kexa.md was changed

Dockerfile was changed

Kexa/main.ts was changed

Kexa/services/analyse.service.ts was changed

Kexa/services/exportation.service.ts was changed

documentation/Documentation-Kexa.md was changed

documentation/save/AzureBlobStorage.md was changed

documentation/save/MongoDB.md was changed

documentation/save/MySQL.md was changed


## 1.14.0-SNAPSHOT.18.b28d27d

### Files added: 2

Kexa/rules/KubeComplianceSetRules.yaml was added

Kexa/rules/StorageSecurity.yaml was added

### Files changed: 12

Kexa/rules/KubeComplianceSetRules.yaml was changed

Kexa/rules/StorageSecurity.yaml was changed

Kexa/models/kubernetes/kubernetes.models.ts was changed

Kexa/rules/AwsComplianceSetRules.yaml was changed

Kexa/rules/AzureComplianceSetRules.yaml was changed

Kexa/rules/Kubernete.yaml was changed

Kexa/rules/awsSetRules.yaml was changed

Kexa/rules/rulesByProvider/awsSetRules.yaml was changed

Kexa/rules/rulesByProvider/azureSetRules.yaml was changed

Kexa/services/addOn/awsGathering.service.ts was changed

Kexa/services/addOn/display/kubernetesDisplay.service.ts was changed

Kexa/services/addOn/kubernetesGathering.service.ts was changed


## 1.14.0-SNAPSHOT.19.37ca242

### Files added: 3

Kexa/rules/KubeComplianceSetRules.yaml was added

Kexa/rules/StorageSecurity.yaml was added

pnpm-lock.yaml was added

### Files changed: 23

Kexa/rules/KubeComplianceSetRules.yaml was changed

Kexa/rules/StorageSecurity.yaml was changed

pnpm-lock.yaml was changed

.github/workflows/ci.yml was changed

CHANGELOG.md was changed

Dockerfile was changed

Kexa/models/kubernetes/kubernetes.models.ts was changed

Kexa/rules/AwsComplianceSetRules.yaml was changed

Kexa/rules/AzureComplianceSetRules.yaml was changed

Kexa/rules/Kubernete.yaml was changed

Kexa/rules/awsSetRules.yaml was changed

Kexa/rules/rulesByProvider/awsSetRules.yaml was changed

Kexa/rules/rulesByProvider/azureSetRules.yaml was changed

Kexa/services/addOn/awsGathering.service.ts was changed

Kexa/services/addOn/display/kubernetesDisplay.service.ts was changed

Kexa/services/addOn/kubernetesGathering.service.ts was changed

Kexa/services/updateCapability.service.ts was changed

README.md was changed

VERSION was changed

capacity.json was changed

documentation/Documentation-Kexa.md was changed

package-lock.json was changed

package.json was changed


## 1.14.0-SNAPSHOT.22.e707453

### Files added: 0

### Files changed: 2

capacity.json was changed

package.json was changed



## 1.14.0-SNAPSHOT.28.0918be4

### Files added: 0

### Files changed: 3

CHANGELOG.md was changed

VERSION was changed

package.json was changed


## 1.14.0-SNAPSHOT.30.c0a82d7

### Files added: 0

### Files changed: 1

.github/workflows/ci.yml was changed


## 1.14.0-SNAPSHOT.32.8960e5d

### Files added: 0

### Files changed: 2

Kexa/services/analyse.service.ts was changed

documentation/Documentation-Kexa.md was changed## 1.14.0-devestebanexportsaasaddon.38.b0f21a8

### Files added: 5

Kexa/models/export/kexa/config.model.ts was added

Kexa/services/addOn/exportation/kexaExportation.service.ts was added

Kexa/services/addOn/save/kexaSave.service.ts was added

config/demo/kexa.default.json was added

documentation/save/Kexa.md was added

### Files changed: 15

Kexa/models/export/kexa/config.model.ts was changed

Kexa/services/addOn/exportation/kexaExportation.service.ts was changed

Kexa/services/addOn/save/kexaSave.service.ts was changed

config/demo/kexa.default.json was changed

documentation/save/Kexa.md was changed

CHANGELOG.md was changed

Dockerfile was changed

Kexa/main.ts was changed

Kexa/services/analyse.service.ts was changed

Kexa/services/exportation.service.ts was changed

VERSION was changed

documentation/Documentation-Kexa.md was changed

documentation/save/AzureBlobStorage.md was changed

documentation/save/MongoDB.md was changed

documentation/save/MySQL.md was changed


## 1.14.0-SNAPSHOT.40.55093b5

### Files added: 5

Kexa/models/export/kexa/config.model.ts was added

Kexa/services/addOn/exportation/kexaExportation.service.ts was added

Kexa/services/addOn/save/kexaSave.service.ts was added

config/demo/kexa.default.json was added

documentation/save/Kexa.md was added

### Files changed: 16

Kexa/models/export/kexa/config.model.ts was changed

Kexa/services/addOn/exportation/kexaExportation.service.ts was changed

Kexa/services/addOn/save/kexaSave.service.ts was changed

config/demo/kexa.default.json was changed

documentation/save/Kexa.md was changed

CHANGELOG.md was changed

Dockerfile was changed

Kexa/main.ts was changed

Kexa/services/analyse.service.ts was changed

Kexa/services/exportation.service.ts was changed

VERSION was changed

documentation/Documentation-Kexa.md was changed

documentation/save/AzureBlobStorage.md was changed

documentation/save/MongoDB.md was changed

documentation/save/MySQL.md was changed

package.json was changed


## 1.14.0-SNAPSHOT.44.30e3a57

### Files added: 0

### Files changed: 7

Kexa/models/resultScan.models.ts was changed

Kexa/services/addOn/azureGathering.service.ts was changed

Kexa/services/addOn/exportation/kexaExportation.service.ts was changed

Kexa/services/addOn/save/kexaSave.service.ts was changed

Kexa/services/analyse.service.ts was changed

documentation/save/Kexa.md was changed

package.json was changed


## 1.14.0-SNAPSHOT.49.8cc9c18

### Files added: 0

### Files changed: 2

Kexa/rules/rulesByProvider/azureSetRules.yaml was changed

Kexa/services/analyse.service.ts was changed

## 1.14.0-dependabotnpmandyarnoctokit312.25.c652795

### Files added: 0

### Files changed: 3

package-lock.json was changed

package.json was changed

pnpm-lock.yaml was changed

## 1.14.0-SNAPSHOT.61.adfdde2

### Files added: 0

### Files changed: 2

package.json was changed

pnpm-lock.yaml was changed


## 1.14.0-SNAPSHOT.64.4d48a31

### Files added: 0

### Files changed: 4

Kexa/models/kubernetes/kubernetes.models.ts was changed

Kexa/rules/Kubernete.yaml was changed

Kexa/services/addOn/display/kubernetesDisplay.service.ts was changed

Kexa/services/addOn/kubernetesGathering.service.ts was changed


## 1.14.0-SNAPSHOT.70.5ad0057

### Files added: 0

### Files changed: 0


## 1.14.0-SNAPSHOT.72.8038dde

### Files added: 0

### Files changed: 1

Kexa/__tests__/services/analyse.test.ts was changed


## 1.14.0-SNAPSHOT.74.b2f8bc4

### Files added: 0

### Files changed: 4

Kexa/__tests__/services/analyse.test.ts was changed

Kexa/models/settingFile/conditions.models.ts was changed

Kexa/services/addOn.service.ts was changed

Kexa/services/analyse.service.ts was changed


## 1.14.0-azurebenchmark.85.61e028f

### Files added: 1

Kexa/rules/azureBenchmarkRules.yaml was added

### Files changed: 10

Kexa/rules/azureBenchmarkRules.yaml was changed

Kexa/emails/emails.ts was changed

Kexa/models/azure/resource.models.ts was changed

Kexa/rules/Kubernete.yaml was changed

Kexa/services/addOn/azureGathering.service.ts was changed

Kexa/services/addOn/display/azureDisplay.service.ts was changed

## 1.14.0-devestebancontinuousscan.80.7266ea8

### Files added: 2

Kexa/services/memoisation.service.ts was added

config/demo/exemple6.default.json was added

### Files changed: 10

Kexa/services/memoisation.service.ts was changed

config/demo/exemple6.default.json was changed

Kexa/index.ts was changed

Kexa/main.ts was changed

Kexa/models/settingFile/conditions.models.ts was changed

Kexa/services/addOn.service.ts was changed

Kexa/services/analyse.service.ts was changed

Kexa/services/manageVarEnvironnement.service.ts was changed

Kexa/services/updateCapability.service.ts was changed

package.json was changed

pnpm-lock.yaml was changed


documentation/Documentation-Kexa.md was changed


## 1.14.0-SNAPSHOT.82.2b921cc

### Files added: 2

Kexa/services/memoisation.service.ts was added

config/demo/exemple6.default.json was added

### Files changed: 13

Kexa/services/memoisation.service.ts was changed

config/demo/exemple6.default.json was changed

CHANGELOG.md was changed

Kexa/index.ts was changed

Kexa/main.ts was changed

Kexa/models/settingFile/conditions.models.ts was changed

Kexa/services/addOn.service.ts was changed

Kexa/services/analyse.service.ts was changed

Kexa/services/manageVarEnvironnement.service.ts was changed

Kexa/services/updateCapability.service.ts was changed

VERSION was changed

documentation/Documentation-Kexa.md was changed

package.json was changed

## 1.14.0-azurebenchmark.94.2e08853

### Files added: 1

Kexa/rules/azureBenchmarkRules.yaml was added

### Files changed: 12

Kexa/rules/azureBenchmarkRules.yaml was changed

CHANGELOG.md was changed

Kexa/emails/emails.ts was changed

Kexa/models/azure/resource.models.ts was changed

Kexa/rules/Kubernete.yaml was changed

Kexa/services/addOn/azureGathering.service.ts was changed

Kexa/services/addOn/display/azureDisplay.service.ts was changed

Kexa/services/manageVarEnvironnement.service.ts was changed

VERSION was changed

capacity.json was changed

package.json was changed

pnpm-lock.yaml was changed


## 1.14.0-SNAPSHOT.96.8016b12

### Files added: 5

Kexa/__tests__/helpers/jsonStringify.test.ts was added

Kexa/helpers/jsonStringify.ts was added

Kexa/rules/azureBenchmarkRules.yaml was added

Kexa/services/memoisation.service.ts was added

config/demo/exemple6.default.json was added

### Files changed: 40

Kexa/__tests__/helpers/jsonStringify.test.ts was changed

Kexa/helpers/jsonStringify.ts was changed

Kexa/rules/azureBenchmarkRules.yaml was changed

Kexa/services/memoisation.service.ts was changed

config/demo/exemple6.default.json was changed

CHANGELOG.md was changed

Kexa/__tests__/services/analyse.test.ts was changed

Kexa/emails/emails.ts was changed

Kexa/helpers/files.ts was changed

Kexa/index.ts was changed

Kexa/main.ts was changed

Kexa/models/azure/resource.models.ts was changed

Kexa/models/kubernetes/kubernetes.models.ts was changed

Kexa/models/settingFile/conditions.models.ts was changed

Kexa/rules/AzureComplianceSetRules.yaml was changed

Kexa/rules/BenchmarkOffice365.yaml was changed

Kexa/rules/Kubernete.yaml was changed

Kexa/services/addOn.service.ts was changed

Kexa/services/addOn/awsGathering.service.ts was changed

Kexa/services/addOn/azureGathering.service.ts was changed

Kexa/services/addOn/display/azureDisplay.service.ts was changed

Kexa/services/addOn/display/kubernetesDisplay.service.ts was changed

Kexa/services/addOn/gcpGathering.service.ts was changed

Kexa/services/addOn/googleWorkspaceGathering.service.ts was changed

Kexa/services/addOn/kubernetesGathering.service.ts was changed

Kexa/services/addOn/o365Gathering.service.ts was changed

Kexa/services/addOn/save/amazonS3Save.service.ts was changed

Kexa/services/alerte.service.ts was changed

Kexa/services/analyse.service.ts was changed

Kexa/services/manageVarEnvironnement.service.ts was changed

Kexa/services/save.service.ts was changed

Kexa/services/saving/azureBlobStorage.service.ts was changed

Kexa/services/saving/mySQL.service.ts was changed

Kexa/services/updateCapability.service.ts was changed

README.md was changed

VERSION was changed

capacity.json was changed

documentation/Documentation-Kexa.md was changed

package.json was changed

pnpm-lock.yaml was changed


## 1.14.0-SNAPSHOT.98.ac1e91a

### Files added: 2

Kexa/rules/crossCloudDisksChecks.yaml was added

Kexa/rules/gcpSetRules.yaml was added

### Files changed: 2

Kexa/rules/crossCloudDisksChecks.yaml was changed

Kexa/rules/gcpSetRules.yaml was changed


## 1.14.0-SNAPSHOT.100.4d4f6c7

### Files added: 0

### Files changed: 1

documentation/Documentation-Kexa.md was changed


## 1.14.0-devadrienrules.106.6f7a9e6

### Files added: 0

### Files changed: 0


## 1.14.0-devadrienrules.111.0643e07

### Files added: 7

Kexa/models/helm/config.models.ts was added

Kexa/models/helm/ressource.models.ts was added

Kexa/rules/helmSetRules.yaml was added

Kexa/services/addOn/display/helmDisplay.service.ts was added

Kexa/services/addOn/helmGathering.service.ts was added

documentation/provider/Helm.md was added

images/helm-logo.svg was added

### Files changed: 11

Kexa/models/helm/config.models.ts was changed

Kexa/models/helm/ressource.models.ts was changed

Kexa/rules/helmSetRules.yaml was changed

Kexa/services/addOn/display/helmDisplay.service.ts was changed

Kexa/services/addOn/helmGathering.service.ts was changed

documentation/provider/Helm.md was changed

images/helm-logo.svg was changed

Kexa/enum/provider.enum.ts was changed

Kexa/rules/VaultsAnalysis.yaml was changed

package.json was changed

pnpm-lock.yaml was changed


## 1.14.0-SNAPSHOT.105.579d157

### Files added: 2

Kexa/rules/SecretsRotation.yaml was added

Kexa/rules/awsTesting.yaml was added

### Files changed: 17

Kexa/rules/SecretsRotation.yaml was changed

Kexa/rules/awsTesting.yaml was changed

Kexa/rules/StorageSecurity.yaml was changed

Kexa/rules/awsBenchmarkRules.yaml was changed

Kexa/rules/azureBenchmarkRules.yaml was changed

Kexa/rules/crossCloudDisksChecks.yaml was changed

Kexa/rules/gcpSetRules.yaml was changed

Kexa/rules/rulesByProvider/awsSetRules.yaml was changed

Kexa/rules/rulesByProvider/azureSetRules.yaml was changed

Kexa/rules/rulesByProvider/gcpSetRules.yaml was changed

Kexa/services/addOn/awsGathering.service.ts was changed

Kexa/services/addOn/azureGathering.service.ts was changed

Kexa/services/addOn/display/awsDisplay.service.ts was changed

Kexa/services/addOn/display/gcpDisplay.service.ts was changed

Kexa/services/addOn/gcpGathering.service.ts was changed

Kexa/services/addOn/save/kexaSave.service.ts was changed


## 1.14.0-SNAPSHOT.109.946ff84

### Files added: 2

Kexa/rules/SecretsRotation.yaml was added

Kexa/rules/awsTesting.yaml was added

### Files changed: 21

Kexa/rules/SecretsRotation.yaml was changed

Kexa/rules/awsTesting.yaml was changed

CHANGELOG.md was changed

Kexa/rules/StorageSecurity.yaml was changed

Kexa/rules/awsBenchmarkRules.yaml was changed

Kexa/rules/azureBenchmarkRules.yaml was changed

Kexa/rules/crossCloudDisksChecks.yaml was changed

Kexa/rules/gcpSetRules.yaml was changed

Kexa/rules/rulesByProvider/awsSetRules.yaml was changed

Kexa/rules/rulesByProvider/azureSetRules.yaml was changed

Kexa/rules/rulesByProvider/gcpSetRules.yaml was changed

Kexa/services/addOn/awsGathering.service.ts was changed

Kexa/services/addOn/azureGathering.service.ts was changed

Kexa/services/addOn/display/awsDisplay.service.ts was changed

Kexa/services/addOn/display/gcpDisplay.service.ts was changed

Kexa/services/addOn/gcpGathering.service.ts was changed

Kexa/services/addOn/save/kexaSave.service.ts was changed

VERSION was changed

capacity.json was changed

package.json was changed


## 1.14.0-SNAPSHOT.116.bc78404

### Files added: 0

### Files changed: 7

CHANGELOG.md was changed

Kexa/services/addOn/display/awsDisplay.service.ts was changed

Kexa/services/addOn/display/gcpDisplay.service.ts was changed

Kexa/services/addOn/gcpGathering.service.ts was changed

VERSION was changed

package.json was changed

Kexa/rules/VaultsAnalysis.yaml was changed## 1.14.0-devadrienrules.123.f6e31c2


### Files added: 7

Kexa/models/helm/config.models.ts was added

Kexa/models/helm/ressource.models.ts was added

Kexa/rules/helmSetRules.yaml was added

Kexa/services/addOn/display/helmDisplay.service.ts was added

Kexa/services/addOn/helmGathering.service.ts was added

documentation/provider/Helm.md was added

images/helm-logo.svg was added

### Files changed: 14

Kexa/models/helm/config.models.ts was changed

Kexa/models/helm/ressource.models.ts was changed

Kexa/rules/helmSetRules.yaml was changed

Kexa/services/addOn/display/helmDisplay.service.ts was changed

Kexa/services/addOn/helmGathering.service.ts was changed

documentation/provider/Helm.md was changed

images/helm-logo.svg was changed

CHANGELOG.md was changed

Kexa/enum/provider.enum.ts was changed

Kexa/rules/VaultsAnalysis.yaml was changed

VERSION was changed

capacity.json was changed

package.json was changed

pnpm-lock.yaml was changed


## 1.14.0-SNAPSHOT.130.c064cfe

### Files added: 7

Kexa/models/helm/config.models.ts was added

Kexa/models/helm/ressource.models.ts was added

Kexa/rules/rulesByProvider/helmSetRules.yaml was added

Kexa/services/addOn/display/helmDisplay.service.ts was added

Kexa/services/addOn/helmGathering.service.ts was added

documentation/provider/Helm.md was added

images/helm-logo.svg was added

### Files changed: 30

Kexa/models/helm/config.models.ts was changed

Kexa/models/helm/ressource.models.ts was changed

Kexa/rules/rulesByProvider/helmSetRules.yaml was changed

Kexa/services/addOn/display/helmDisplay.service.ts was changed

Kexa/services/addOn/helmGathering.service.ts was changed

documentation/provider/Helm.md was changed

images/helm-logo.svg was changed

.dockerignore was changed

CHANGELOG.md was changed

Kexa/enum/provider.enum.ts was changed

Kexa/main.ts was changed

Kexa/rules/VaultsAnalysis.yaml was changed

Kexa/rules/rulesByProvider/azureSetRules.yaml was changed

Kexa/rules/rulesByProvider/gcpSetRules.yaml was changed

Kexa/rules/rulesByProvider/httpSetRules.yaml was changed

Kexa/rules/rulesByProvider/kubernetesSetRules.yaml was changed

Kexa/services/addOn/awsGathering.service.ts was changed

Kexa/services/addOn/azureGathering.service.ts was changed

Kexa/services/addOn/gcpGathering.service.ts was changed

Kexa/services/addOn/kubernetesGathering.service.ts was changed

README.md was changed

VERSION was changed

capacity.json was changed

package.json was changed

pnpm-lock.yaml was changed

Kexa/rules/rulesByProvider/HTTPRules.yaml was changed

Kexa/rules/rulesByProvider/driveRules.yaml was changed


## 1.14.0-SNAPSHOT.133.a1f13cd

### Files added: 2

Kexa/services/functions/dateFormats.ts was added

config/demo/helm.default.json was added

### Files changed: 6

Kexa/services/functions/dateFormats.ts was changed

config/demo/helm.default.json was changed

Kexa/rules/rulesByProvider/azureSetRules.yaml was changed

Kexa/rules/rulesByProvider/gcpSetRules.yaml was changed

Kexa/rules/rulesByProvider/kubernetesSetRules.yaml was changed

Kexa/services/addOn/helmGathering.service.ts was changed


## 1.14.0-SNAPSHOT.135.e461bb7

### Files added: 9

Kexa/helpers/time.ts was added

Kexa/models/helm/config.models.ts was added

Kexa/models/helm/ressource.models.ts was added

Kexa/rules/rulesByProvider/helmSetRules.yaml was added

Kexa/services/addOn/display/helmDisplay.service.ts was added

Kexa/services/addOn/helmGathering.service.ts was added

config/demo/helm.default.json was added

documentation/provider/Helm.md was added

images/helm-logo.svg was added

### Files changed: 32

Kexa/helpers/time.ts was changed

Kexa/models/helm/config.models.ts was changed

Kexa/models/helm/ressource.models.ts was changed

Kexa/rules/rulesByProvider/helmSetRules.yaml was changed

Kexa/services/addOn/display/helmDisplay.service.ts was changed

Kexa/services/addOn/helmGathering.service.ts was changed

config/demo/helm.default.json was changed

documentation/provider/Helm.md was changed

images/helm-logo.svg was changed

.dockerignore was changed

CHANGELOG.md was changed

Dockerfile was changed

Kexa/enum/provider.enum.ts was changed

Kexa/main.ts was changed

Kexa/rules/VaultsAnalysis.yaml was changed

Kexa/rules/rulesByProvider/azureSetRules.yaml was changed

Kexa/rules/rulesByProvider/gcpSetRules.yaml was changed

Kexa/rules/rulesByProvider/httpSetRules.yaml was changed

Kexa/rules/rulesByProvider/kubernetesSetRules.yaml was changed

Kexa/services/addOn/awsGathering.service.ts was changed

Kexa/services/addOn/azureGathering.service.ts was changed

Kexa/services/addOn/gcpGathering.service.ts was changed

Kexa/services/addOn/kubernetesGathering.service.ts was changed

README.md was changed

VERSION was changed

capacity.json was changed

package.json was changed

pnpm-lock.yaml was changed

Kexa/rules/rulesByProvider/HTTPRules.yaml was changed

Kexa/rules/rulesByProvider/driveRules.yaml was changed

## 1.14.0-SNAPSHOT.140.b95d58c

### Files added: 0

### Files changed: 4

Kexa/services/addOn/exportation/kexaExportation.service.ts was changed

Kexa/services/addOn/save/kexaSave.service.ts was changed

VERSION was changed

package.json was changed

## 1.14.0-SNAPSHOT.149.0b025a0

### Files added: 2

rules/Kubernete.yaml was added

rules/perProvider/kubernetesSetRules.yaml was added

### Files changed: 47

rules/Kubernete.yaml was changed

rules/perProvider/kubernetesSetRules.yaml was changed

.gitignore was changed

CHANGELOG.md was changed

Kexa/main.ts was changed

Kexa/services/addOn/azureGathering.service.ts was changed

Kexa/services/addOn/exportation/kexaExportation.service.ts was changed

Kexa/services/addOn/gcpGathering.service.ts was changed

Kexa/services/addOn/googleWorkspaceGathering.service.ts was changed

Kexa/services/addOn/kubernetesGathering.service.ts was changed

Kexa/services/addOn/save/kexaSave.service.ts was changed

VERSION was changed

documentation/Documentation-Kexa.md was changed

package.json was changed

rules/AwsComplianceSetRules.yaml was changed

rules/AzureComplianceSetRules.yaml was changed

rules/BenchmarkOffice365.yaml was changed

rules/BenchmarkWorkspace.yaml was changed

rules/Deployement.yaml was changed

rules/Economy.yaml was changed

rules/GcpComplianceSetRules.yaml was changed

rules/HTTPRules.yaml was changed

rules/KubeComplianceSetRules.yaml was changed

rules/OperationalExcellence.yaml was changed

rules/Performance.yaml was changed

rules/PostDeployement.yaml was changed

rules/PreDeployement.yaml was changed

rules/SecretsRotation.yaml was changed

rules/Security.yaml was changed

rules/StorageSecurity.yaml was changed

rules/awsBenchmarkRules.yaml was changed

rules/azureBenchmarkRules.yaml was changed

rules/crossCloudDisksChecks.yaml was changed

rules/perProvider/awsSetRules.yaml was changed

rules/perProvider/azureSetRules.yaml was changed

rules/perProvider/driveRules.yaml was changed

rules/perProvider/gcpSetRules.yaml was changed

rules/perProvider/githubSetRules.yaml was changed

rules/perProvider/googleDriveSetRules.yaml was changed

rules/perProvider/googleWorkspaceSetRules.yaml was changed

rules/perProvider/httpSetRules.yaml was changed

rules/perProvider/o365SetRules.yaml was changed

rules/rulesByProvider/kubernetesSetRules.yaml was changed

## 1.14.0-SNAPSHOT.149.0b025a0

### Files added: 1

rules/rulesByProvider/kubernetesSetRules.yaml was added

### Files changed: 6

rules/rulesByProvider/kubernetesSetRules.yaml was changed

CHANGELOG.md was changed

Kexa/main.ts was changed

Kexa/services/addOn/gcpGathering.service.ts was changed

Kexa/services/addOn/googleWorkspaceGathering.service.ts was changed

Kexa/services/addOn/kubernetesGathering.service.ts was changed


## 1.14.0-SNAPSHOT.163.5fbfccc

### Files added: 0

### Files changed: 6

CHANGELOG.md was changed

Kexa/services/addOn/awsGathering.service.ts was changed

Kexa/services/addOn/display/awsDisplay.service.ts was changed

VERSION was changed

package.json was changed

pnpm-lock.yaml was changed


## 1.14.0-SNAPSHOT.164.8aea06c

### Files added: 0

### Files changed: 0


## 1.14.0-SNAPSHOT.199.1b76497

### Files added: 2

.github/workflows/sbom.yml was added

kexa-sbom.json was added

### Files changed: 6

.github/workflows/sbom.yml was changed

kexa-sbom.json was changed

CHANGELOG.md was changed

VERSION was changed

capacity.json was changed

package.json was changed


## 1.14.0-SNAPSHOT.204.3d08c84

### Files added: 1

.github/workflows/scorecard.yml was added

### Files changed: 1

.github/workflows/scorecard.yml was changed


## 1.14.0-SNAPSHOT.209.f50a70d

### Files added: 0

### Files changed: 2

.github/workflows/sbom.yml was changed

VERSION was changed

## 1.14.0-SNAPSHOT.215.58978e7

### Files added: 0

### Files changed: 5

.github/workflows/sbom.yml was changed

CHANGELOG.md was changed

VERSION was changed

kexa-sbom.json was changed

package.json was changed


## 1.14.0-SNAPSHOT.216.81f3749

### Files added: 0

### Files changed: 5

.github/workflows/sbom.yml was changed

CHANGELOG.md was changed

VERSION was changed

kexa-sbom.json was changed

package.json was changed


## 1.14.0-SNAPSHOT.217.ddd62fa

### Files added: 0

### Files changed: 5

.github/workflows/sbom.yml was changed

CHANGELOG.md was changed

VERSION was changed

kexa-sbom.json was changed

package.json was changed


## 1.14.0-SNAPSHOT.218.282433e

### Files added: 0

### Files changed: 5

.github/workflows/sbom.yml was changed

CHANGELOG.md was changed

VERSION was changed

kexa-sbom.json was changed

package.json was changed


## 1.14.0-SNAPSHOT.219.cb62d8d

### Files added: 0

### Files changed: 5

.github/workflows/sbom.yml was changed

CHANGELOG.md was changed

VERSION was changed

kexa-sbom.json was changed

package.json was changed


## 1.14.0-SNAPSHOT.220.4dc85c2

### Files added: 0

### Files changed: 5

.github/workflows/sbom.yml was changed

CHANGELOG.md was changed

VERSION was changed

kexa-sbom.json was changed

package.json was changed

## 1.14.0-SNAPSHOT.235.b7ef7d9

### Files added: 0

### Files changed: 6

.github/workflows/ci.yml was changed

.github/workflows/sbom.yml was changed

CHANGELOG.md was changed

VERSION was changed

kexa-sbom.json was changed

package.json was changed


## 1.14.0-SNAPSHOT.236.5f6661c

### Files added: 0

### Files changed: 6

.github/workflows/ci.yml was changed

.github/workflows/sbom.yml was changed

CHANGELOG.md was changed

VERSION was changed

kexa-sbom.json was changed

package.json was changed

## 1.14.0-SNAPSHOT.241.6795455

### Files added: 1

dockerstart.sh was added

### Files changed: 5

dockerstart.sh was changed

CHANGELOG.md was changed

Dockerfile was changed

VERSION was changed


## 1.14.0-devadrienrules.248.a9784a7

### Files added: 13

rules/VaultsAnalysis.yaml was added

rules/rules-testing.yaml was added

rules/rules-with-var.yaml was added

rules/rulesByProvider/awsSetRules.yaml was added

rules/rulesByProvider/azureSetRules.yaml was added

rules/rulesByProvider/driveRules.yaml was added

rules/rulesByProvider/gcpSetRules.yaml was added

rules/rulesByProvider/githubSetRules.yaml was added

rules/rulesByProvider/googleDriveSetRules.yaml was added

rules/rulesByProvider/googleWorkspaceSetRules.yaml was added

rules/rulesByProvider/helmSetRules.yaml was added

rules/rulesByProvider/kubernetesSetRules.yaml was added

rules/rulesByProvider/o365SetRules.yaml was added

### Files changed: 18

rules/VaultsAnalysis.yaml was changed

rules/rules-testing.yaml was changed

rules/rules-with-var.yaml was changed

rules/rulesByProvider/awsSetRules.yaml was changed

rules/rulesByProvider/azureSetRules.yaml was changed

rules/rulesByProvider/driveRules.yaml was changed

rules/rulesByProvider/gcpSetRules.yaml was changed

rules/rulesByProvider/githubSetRules.yaml was changed

rules/rulesByProvider/googleDriveSetRules.yaml was changed

rules/rulesByProvider/googleWorkspaceSetRules.yaml was changed

rules/rulesByProvider/helmSetRules.yaml was changed

rules/rulesByProvider/kubernetesSetRules.yaml was changed

rules/rulesByProvider/o365SetRules.yaml was changed

CONTRIBUTING.md was changed

README.md was changed

VERSION was changed

rules/rulesByProvider/httpSetRules.yaml was changed

## 1.14.0-SNAPSHOT.250.fa1288c

### Files added: 0

### Files changed: 5

CHANGELOG.md was changed

CONTRIBUTING.md was changed

README.md was changed

VERSION was changed

package.json was changed


## 1.14.0-SNAPSHOT.266.3282191

### Files added: 0

### Files changed: 5

.github/workflows/ci.yml was changed

CONTRIBUTING.md was changed

Kexa/enum/alert.enum.ts was changed

Kexa/services/alerte.service.ts was changed

ROADMAP.md was changed


## 1.14.0-SNAPSHOT.268.443c2c1

### Files added: 0

### Files changed: 3

CHANGELOG.md was changed

VERSION was changed

package.json was changed


## 1.14.0-SNAPSHOT.269.e2d48d8

### Files added: 0

### Files changed: 3

CHANGELOG.md was changed

VERSION was changed

package.json was changed


## 1.14.0-SNAPSHOT.270.c89f7f3

### Files added: 0

### Files changed: 3

CHANGELOG.md was changed

VERSION was changed

package.json was changed


## 1.14.0-SNAPSHOT.271.5a78ead

### Files added: 0

### Files changed: 3

CHANGELOG.md was changed

VERSION was changed

package.json was changed


## 1.14.0-SNAPSHOT.272.9b3bdf5

### Files added: 0

### Files changed: 3

CHANGELOG.md was changed

VERSION was changed

package.json was changed

## 1.14.0-SNAPSHOT.277.22e78aa

### Files added: 0

### Files changed: 3

.github/workflows/ci.yml was changed

CHANGELOG.md was changed

VERSION was changed


## 1.14.0-SNAPSHOT.281.02ce2c9

### Files added: 0

### Files changed: 1


## 

### Files added: 1

.github/workflows/versioning.yml was added

### Files changed: 3

.github/workflows/versioning.yml was changed

.github/workflows/ci.yml was changed

CHANGELOG.md was changed


## 

### Files added: 1

rules/azureSetRules.yaml was added

### Files changed: 2

rules/azureSetRules.yaml was changed

.github/workflows/sbom.yml was changed


## 

### Files added: 0

### Files changed: 1


## 

### Files added: 0

### Files changed: 2

.github/workflows/versioning.yml was changed

rules/SecretsRotation.yaml was changed


## 

### Files added: 0

### Files changed: 2

.github/workflows/versioning.yml was changed

CHANGELOG.md was changed


## 

### Files added: 10

Kexa/models/export/postgre/config.models.ts was added

Kexa/query/CRUDPostgres/origins.iquery.ts was added

Kexa/query/CRUDPostgres/providerItems.iquery.ts was added

Kexa/query/CRUDPostgres/providers.iquery.ts was added

Kexa/query/CRUDPostgres/resources.iquery.ts was added

Kexa/query/CRUDPostgres/rules.iquery.ts was added

Kexa/query/CRUDPostgres/scans.iquery.ts was added

Kexa/query/tablePg.iquery.ts was added

Kexa/services/addOn/exportation/postgreExportation.service.ts was added

Kexa/services/saving/postgreSQL.service.ts was added

### Files changed: 14

Kexa/models/export/postgre/config.models.ts was changed

Kexa/query/CRUDPostgres/origins.iquery.ts was changed

Kexa/query/CRUDPostgres/providerItems.iquery.ts was changed

Kexa/query/CRUDPostgres/providers.iquery.ts was changed

Kexa/query/CRUDPostgres/resources.iquery.ts was changed

Kexa/query/CRUDPostgres/rules.iquery.ts was changed

Kexa/query/CRUDPostgres/scans.iquery.ts was changed

Kexa/query/tablePg.iquery.ts was changed

Kexa/services/addOn/exportation/postgreExportation.service.ts was changed

Kexa/services/saving/postgreSQL.service.ts was changed

.github/workflows/sbom.yml was changed

Kexa/main.ts was changed

package.json was changed

pnpm-lock.yaml was changed



## 

### Files added: 10

Kexa/models/export/postgre/config.models.ts was added

Kexa/query/CRUDPostgres/origins.iquery.ts was added

Kexa/query/CRUDPostgres/providerItems.iquery.ts was added

Kexa/query/CRUDPostgres/providers.iquery.ts was added

Kexa/query/CRUDPostgres/resources.iquery.ts was added

Kexa/query/CRUDPostgres/rules.iquery.ts was added

Kexa/query/CRUDPostgres/scans.iquery.ts was added

Kexa/query/tablePg.iquery.ts was added

Kexa/services/addOn/exportation/postgreExportation.service.ts was added

Kexa/services/saving/postgreSQL.service.ts was added

### Files changed: 15

Kexa/models/export/postgre/config.models.ts was changed

Kexa/query/CRUDPostgres/origins.iquery.ts was changed

Kexa/query/CRUDPostgres/providerItems.iquery.ts was changed

Kexa/query/CRUDPostgres/providers.iquery.ts was changed

Kexa/query/CRUDPostgres/resources.iquery.ts was changed

Kexa/query/CRUDPostgres/rules.iquery.ts was changed

Kexa/query/CRUDPostgres/scans.iquery.ts was changed

Kexa/query/tablePg.iquery.ts was changed

Kexa/services/addOn/exportation/postgreExportation.service.ts was changed

Kexa/services/saving/postgreSQL.service.ts was changed

.github/workflows/sbom.yml was changed

CHANGELOG.md was changed

Kexa/main.ts was changed

package.json was changed

pnpm-lock.yaml was changed


## 

### Files added: 10

Kexa/models/export/postgre/config.models.ts was added

Kexa/query/CRUDPostgres/origins.iquery.ts was added

Kexa/query/CRUDPostgres/providerItems.iquery.ts was added

Kexa/query/CRUDPostgres/providers.iquery.ts was added

Kexa/query/CRUDPostgres/resources.iquery.ts was added

Kexa/query/CRUDPostgres/rules.iquery.ts was added

Kexa/query/CRUDPostgres/scans.iquery.ts was added

Kexa/query/tablePg.iquery.ts was added

Kexa/services/addOn/exportation/postgreExportation.service.ts was added

Kexa/services/saving/postgreSQL.service.ts was added

### Files changed: 15

Kexa/models/export/postgre/config.models.ts was changed

Kexa/query/CRUDPostgres/origins.iquery.ts was changed

Kexa/query/CRUDPostgres/providerItems.iquery.ts was changed

Kexa/query/CRUDPostgres/providers.iquery.ts was changed

Kexa/query/CRUDPostgres/resources.iquery.ts was changed

Kexa/query/CRUDPostgres/rules.iquery.ts was changed

Kexa/query/CRUDPostgres/scans.iquery.ts was changed

Kexa/query/tablePg.iquery.ts was changed

Kexa/services/addOn/exportation/postgreExportation.service.ts was changed

Kexa/services/saving/postgreSQL.service.ts was changed

.github/workflows/sbom.yml was changed

CHANGELOG.md was changed

Kexa/main.ts was changed

package.json was changed

pnpm-lock.yaml was changed


## 

### Files added: 16

Kexa/services/addOn/save/postgresSave.service.ts was added

config/demo/postgres.default.json was added

documentation/notifications/jira.md was added

documentation/notifications/teams.md was added

documentation/save/Postgres.md was added

images/expected_teams.png was added

images/issue_typeid.png was added

images/jira-logo.png was added

images/jira_projectid.png was added

images/jiraenv.png was added

images/jiraresults.png was added

images/jiraresults_details_multiple.png was added

images/jiraresults_details_one.png was added

images/msteams-logo.png was added

images/postgres.png was added

images/ruleconfigjira.png was added

### Files changed: 20

Kexa/services/addOn/save/postgresSave.service.ts was changed

config/demo/postgres.default.json was changed

documentation/notifications/jira.md was changed

documentation/notifications/teams.md was changed

documentation/save/Postgres.md was changed

images/expected_teams.png was changed

images/issue_typeid.png was changed

images/jira-logo.png was changed

images/jira_projectid.png was changed

images/jiraenv.png was changed

images/jiraresults.png was changed

images/jiraresults_details_multiple.png was changed

images/jiraresults_details_one.png was changed

images/msteams-logo.png was changed

images/postgres.png was changed

images/ruleconfigjira.png was changed

Kexa/query/tablePg.iquery.ts was changed

ROADMAP.md was changed

Kexa/services/addOn/exportation/postgresExportation.service.ts was changed

Kexa/services/saving/postgresSQL.service.ts was changed


## 

### Files added: 16

Kexa/services/addOn/save/postgresSave.service.ts was added

config/demo/postgres.default.json was added

documentation/notifications/jira.md was added

documentation/notifications/teams.md was added

documentation/save/Postgres.md was added

images/expected_teams.png was added

images/issue_typeid.png was added

images/jira-logo.png was added

images/jira_projectid.png was added

images/jiraenv.png was added

images/jiraresults.png was added

images/jiraresults_details_multiple.png was added

images/jiraresults_details_one.png was added

images/msteams-logo.png was added

images/postgres.png was added

images/ruleconfigjira.png was added

### Files changed: 21

Kexa/services/addOn/save/postgresSave.service.ts was changed

config/demo/postgres.default.json was changed

documentation/notifications/jira.md was changed

documentation/notifications/teams.md was changed

documentation/save/Postgres.md was changed

images/expected_teams.png was changed

images/issue_typeid.png was changed

images/jira-logo.png was changed

images/jira_projectid.png was changed

images/jiraenv.png was changed

images/jiraresults.png was changed

images/jiraresults_details_multiple.png was changed

images/jiraresults_details_one.png was changed

images/msteams-logo.png was changed

images/postgres.png was changed

images/ruleconfigjira.png was changed

CHANGELOG.md was changed

Kexa/query/tablePg.iquery.ts was changed

ROADMAP.md was changed

Kexa/services/addOn/exportation/postgresExportation.service.ts was changed

Kexa/services/saving/postgresSQL.service.ts was changed


## 

### Files added: 0

### Files changed: 3

README.md was changed

documentation/Documentation-Kexa.md was changed


## 

### Files added: 0

### Files changed: 4

CHANGELOG.md was changed

README.md was changed

documentation/Documentation-Kexa.md was changed


## 

### Files added: 0

### Files changed: 0



## 

### Files added: 9

images/readme_grafana_addons.png was added

images/readme_grafana_kube1.png was added

images/readme_jira_result.png was added

images/readme_log_result.png was added

images/readme_saas_result.png was added

images/readme_teams_result.png was added

images/reamde_grafana_kube2.png was added

images/reamde_jira_result_2.png was added

rules/kubernetesConsumption.yaml was added

### Files changed: 16

images/readme_grafana_addons.png was changed

images/readme_grafana_kube1.png was changed

images/readme_jira_result.png was changed

images/readme_log_result.png was changed

images/readme_saas_result.png was changed

images/readme_teams_result.png was changed

images/reamde_grafana_kube2.png was changed

images/reamde_jira_result_2.png was changed

rules/kubernetesConsumption.yaml was changed

CHANGELOG.md was changed

Kexa/main.ts was changed

Kexa/services/addOn/exportation/postgresExportation.service.ts was changed

Kexa/services/addOn/kubernetesGathering.service.ts was changed

README.md was changed

documentation/Documentation-Kexa.md was changed

rules/perProvider/kubernetesSetRules.yaml was changed


## 

### Files added: 1

rules/kubernetesConsumption.yaml was added

### Files changed: 3

rules/kubernetesConsumption.yaml was changed

Kexa/helpers/jsonStringify.ts was changed

Kexa/services/alerte.service.ts was changed

### Files added: 8

images/readme_grafana_addons.png was added

images/readme_grafana_kube1.png was added

images/readme_jira_result.png was added

images/readme_log_result.png was added

images/readme_saas_result.png was added

images/readme_teams_result.png was added

images/reamde_grafana_kube2.png was added

images/reamde_jira_result_2.png was added

### Files changed: 14

images/readme_grafana_addons.png was changed

images/readme_grafana_kube1.png was changed

images/readme_jira_result.png was changed

images/readme_log_result.png was changed

images/readme_saas_result.png was changed

images/readme_teams_result.png was changed

images/reamde_grafana_kube2.png was changed

images/reamde_jira_result_2.png was changed

CHANGELOG.md was changed

Kexa/main.ts was changed

Kexa/services/addOn/exportation/postgresExportation.service.ts was changed

Kexa/services/addOn/kubernetesGathering.service.ts was changed

README.md was changed

documentation/Documentation-Kexa.md was changed


## 

### Files added: 0

### Files changed: 3

CHANGELOG.md was changed

Kexa/helpers/jsonStringify.ts was changed

Kexa/services/alerte.service.ts was changed


## 

### Files added: 0

### Files changed: 3

CHANGELOG.md was changed

Kexa/helpers/jsonStringify.ts was changed

Kexa/services/alerte.service.ts was changed


## 

### Files added: 4

images/reamde_grafana_kube3.png was added

rules/kubernetesConfigurations.yaml was added

rules/kubernetesConsumptions.yaml was added

rules/kubernetesStatus.yaml was added

### Files changed: 9

images/reamde_grafana_kube3.png was changed

rules/kubernetesConfigurations.yaml was changed

rules/kubernetesConsumptions.yaml was changed

rules/kubernetesStatus.yaml was changed

Kexa/services/display.service.ts was changed

README.md was changed

images/readme_grafana_kube1.png was changed

images/reamde_grafana_kube2.png was changed

rules/perProvider/kubernetesSetRules.yaml was changed


## 

### Files added: 1

images/reamde_grafana_kube3.png was added

### Files changed: 6

images/reamde_grafana_kube3.png was changed

CHANGELOG.md was changed

Kexa/services/display.service.ts was changed

README.md was changed

images/readme_grafana_kube1.png was changed

images/reamde_grafana_kube2.png was changed


## 

### Files added: 0

### Files changed: 1

.github/workflows/versioning.yml was changed


## 

### Files added: 0

### Files changed: 1

.github/workflows/versioning.yml was changed


## 

### Files added: 0

### Files changed: 1

.github/workflows/versioning.yml was changed


## 

### Files added: 0

### Files changed: 1

.github/workflows/versioning.yml was changed


## 

### Files added: 0

### Files changed: 1

package.json was changed


## 

### Files added: 0

### Files changed: 6

Kexa/services/addOn/display/awsDisplay.service.ts was changed

Kexa/services/addOn/display/fuzzDisplay.service.ts was changed

Kexa/services/addOn/display/githubDisplay.service.ts was changed

Kexa/services/addOn/display/googleDriveDisplay.service.ts was changed

Kexa/services/addOn/display/httpDisplay.service.ts was changed

Kexa/services/addOn/display/kubernetesDisplay.service.ts was changed


## 

### Files added: 0

### Files changed: 9

CHANGELOG.md was changed

Kexa/services/addOn.service.ts was changed

Kexa/services/addOn/display/awsDisplay.service.ts was changed

Kexa/services/addOn/display/fuzzDisplay.service.ts was changed

Kexa/services/addOn/display/githubDisplay.service.ts was changed

Kexa/services/addOn/display/googleDriveDisplay.service.ts was changed

Kexa/services/addOn/display/httpDisplay.service.ts was changed

Kexa/services/addOn/display/kubernetesDisplay.service.ts was changed

Kexa/services/analyse.service.ts was changed


## 

### Files added: 0

### Files changed: 1

.github/workflows/versioning.yml was changed


## 

### Files added: 0

### Files changed: 1

Kexa/services/api/decryptApi.service.ts was changed


## 

### Files added: 0

### Files changed: 1

documentation/Documentation-Kexa.md was changed


## 

### Files added: 0

### Files changed: 0


## 

### Files added: 0

### Files changed: 5

.gitignore was changed

CHANGELOG.md was changed

Kexa/services/addOn/googleWorkspaceGathering.service.ts was changed

package.json was changed

pnpm-lock.yaml was changed

## 

### Files added: 0

### Files changed: 1


## 

### Files added: 0

### Files changed: 3

CHANGELOG.md was changed

Kexa/services/addOn/googleWorkspaceGathering.service.ts was changed

documentation/provider/GoogleWorkspace.md was changed
