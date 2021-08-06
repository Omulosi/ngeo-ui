const data = {
  counties: [
    {
      name: 'None',
      county_id: 0,
      capital: ''
    },
    {
      name: 'Mombasa',
      county_id: 1,
      capital: 'Monbasa City'
    },
    {
      name: 'Kwale',
      county_id: 2,
      capital: 'Kwale'
    },
    {
      name: 'Kilifi',
      county_id: 3,
      capital: 'Kilifi'
    },
    {
      name: 'Tana River',
      county_id: 4,
      capital: 'Hola'
    },
    {
      name: 'Lamu',
      county_id: 5,
      capital: 'Lamu'
    },
    {
      name: 'Taita-Taveta',
      county_id: 6,
      capital: 'Voi'
    },
    {
      name: 'Garissa',
      county_id: 7,
      capital: 'Garissa'
    },
    {
      name: 'Wajir',
      county_id: 8,
      capital: 'Wajir'
    },
    {
      name: 'Mandera',
      county_id: 9,
      capital: 'Mandera'
    },
    {
      name: 'Marsabit',
      county_id: 10,
      capital: 'Marsabit'
    },
    {
      name: 'Isiolo',
      county_id: 11,
      capital: 'Isiolo'
    },
    {
      name: 'Meru',
      county_id: 12,
      capital: 'Meru'
    },
    {
      name: 'Tharaka-Nithi',
      county_id: 13,
      capital: 'Chuka'
    },
    {
      name: 'Embu',
      county_id: 14,
      capital: 'Embu'
    },
    {
      name: 'Kitui',
      county_id: 15,
      capital: 'Kitui'
    },
    {
      name: 'Machakos',
      county_id: 16,
      capital: 'Machakos'
    },
    {
      name: 'Makueni',
      county_id: 17,
      capital: 'Wote'
    },
    {
      name: 'Nyandarua',
      county_id: 18,
      capital: 'Ol Kalou'
    },
    {
      name: 'Nyeri',
      county_id: 19,
      capital: 'Nyeri'
    },
    {
      name: 'Kirinyaga',
      county_id: 20,
      capital: 'Kerugoya/Kutus'
    },
    {
      name: "Murang'a",
      county_id: 21,
      capital: "Murang'a"
    },
    {
      name: 'Kiambu',
      county_id: 22,
      capital: 'Kiambu'
    },
    {
      name: 'Turkana',
      county_id: 23,
      capital: 'Lodwar'
    },
    {
      name: 'West Pokot',
      county_id: 24,
      capital: 'Kapenguria'
    },
    {
      name: 'Samburu',
      county_id: 25,
      capital: 'Maralal'
    },
    {
      name: 'Trans-Nzoia',
      county_id: 26,
      capital: 'Kitale'
    },
    {
      name: 'Uasin Gishu',
      county_id: 27,
      capital: 'Eldoret'
    },
    {
      name: 'Elgeyo-Marakwet',
      county_id: 28,
      capital: 'Iten'
    },
    {
      name: 'Nandi',
      county_id: 29,
      capital: 'Kapsabet'
    },
    {
      name: 'Baringo',
      county_id: 30,
      capital: 'Kabarnet'
    },
    {
      name: 'Laikipia',
      county_id: 31,
      capital: 'Rumuruti'
    },
    {
      name: 'Nakuru',
      county_id: 32,
      capital: 'Nakuru'
    },
    {
      name: 'Narok',
      county_id: 33,
      capital: 'Narok'
    },
    {
      name: 'Kajiado',
      county_id: 34
    },
    {
      name: 'Kericho',
      county_id: 35,
      capital: 'Kericho'
    },
    {
      name: 'Bomet',
      county_id: 36,
      capital: 'Bomet'
    },
    {
      name: 'Kakamega',
      county_id: 37,
      capital: 'Kakamega'
    },
    {
      name: 'Vihiga',
      county_id: 38,
      capital: 'Vihiga'
    },
    {
      name: 'Bungoma',
      county_id: 39,
      capital: 'Bungoma'
    },
    {
      name: 'Busia',
      county_id: 40,
      capital: 'Busia'
    },
    {
      name: 'Siaya',
      county_id: 41,
      capital: 'Siaya'
    },
    {
      name: 'Kisumu',
      county_id: 42,
      capital: 'Kisumu'
    },
    {
      name: 'Homa Bay',
      county_id: 43,
      capital: 'Homa Bay'
    },
    {
      name: 'Migori',
      county_id: 44,
      capital: 'Migori'
    },
    {
      name: 'Kisii',
      county_id: 45,
      capital: 'Kisii'
    },
    {
      name: 'Nyamira',
      county_id: 46,
      capital: 'Nyamira'
    },
    {
      name: 'Nairobi',
      county_id: 47,
      capital: 'Nairobi City'
    }
  ],
  subCounties: [
    {
      name: 'Changamwe',
      county_id: 1,
      county: 'Mombasa',
      sub_county_id: 111
    },
    {
      name: 'Jomvu',
      county_id: 1,
      county: 'Mombasa',
      sub_county_id: 112
    },
    {
      name: 'Kisauni',
      county_id: 1,
      sub_county_id: 113
    },
    {
      name: 'Mvita',
      county_id: 1,
      sub_county_id: 114
    },
    {
      name: 'Nyali',
      county_id: 1,
      sub_county_id: 115
    },
    {
      name: 'Likoni',
      county_id: 1,
      sub_county_id: 116
    },
    {
      name: 'Kinango',
      county_id: 2,
      sub_county_id: 211
    },
    {
      name: 'Lungalunga',
      county_id: 2,
      sub_county_id: 212
    },
    {
      name: 'Msambweni',
      county_id: 2,
      sub_county_id: 213
    },
    {
      name: 'Matuga',
      county_id: 2,
      sub_county_id: 214
    },
    {
      name: 'Kaloleni',
      county_id: 3,
      sub_county_id: 311
    },
    {
      name: 'Ganze',
      county_id: 3,
      sub_county_id: 312
    },
    {
      name: 'Kilifi north',
      county_id: 3,
      sub_county_id: 313
    },
    {
      name: 'Kilifi south',
      county_id: 3,
      sub_county_id: 314
    },
    {
      name: 'Magarini',
      county_id: 3,
      sub_county_id: 315
    },
    {
      name: 'Malindi',
      county_id: 3,
      sub_county_id: 316
    },
    {
      name: 'Rabai',
      county_id: 3,
      sub_county_id: 317
    },
    {
      name: 'Bura',
      county_id: 4,
      sub_county_id: 411
    },
    {
      name: 'Galole',
      county_id: 4,
      sub_county_id: 412
    },
    {
      name: 'Garsen',
      county_id: 4,
      sub_county_id: 413
    },
    {
      name: 'Lamu East',
      county_id: 5,
      sub_county_id: 511
    },
    {
      name: 'Lamu West',
      county_id: 5,
      sub_county_id: 512
    },
    {
      name: 'Mwatate',
      county_id: 6,
      sub_county_id: 611
    },
    {
      name: 'Taveta',
      county_id: 6,
      sub_county_id: 612
    },
    {
      name: 'Voi',
      county_id: 6,
      sub_county_id: 613
    },
    {
      name: 'Wundanyi',
      county_id: 6,
      sub_county_id: 614
    },
    {
      name: 'Daadab',
      county_id: 7,
      sub_county_id: 711
    },
    {
      name: 'Fafi',
      county_id: 7,
      sub_county_id: 712
    },
    {
      name: 'Garissa Township',
      county_id: 7,
      sub_county_id: 713
    },
    {
      name: 'Ijara',
      county_id: 7,
      sub_county_id: 714
    },
    {
      name: 'Mbalambala',
      county_id: 7,
      sub_county_id: 715
    },
    {
      name: 'Lagdera',
      county_id: 7,
      sub_county_id: 716
    },
    {
      name: 'Eldas',
      county_id: 8,
      sub_county_id: 811
    },
    {
      name: 'Wajir East',
      county_id: 8,
      sub_county_id: 812
    },
    {
      name: 'Wajir North',
      county_id: 8,
      sub_county_id: 813
    },
    {
      name: 'Wajir South',
      county_id: 8,
      sub_county_id: 814
    },
    {
      name: 'Wajir West',
      county_id: 8,
      sub_county_id: 815
    },
    {
      name: 'Banissa',
      county_id: 9,
      sub_county_id: 911
    },
    {
      name: 'Lafey',
      county_id: 9,
      sub_county_id: 912
    },
    {
      name: 'Mandera East',
      county_id: 9,
      sub_county_id: 913
    },
    {
      name: 'Mandera North',
      county_id: 9,
      sub_county_id: 914
    },
    {
      name: 'Mandera South',
      county_id: 9,
      sub_county_id: 915
    },
    {
      name: 'Mandera West',
      county_id: 9,
      sub_county_id: 916
    },
    {
      name: 'Laisamis',
      county_id: 10,
      sub_county_id: 101
    },
    {
      name: 'Moyale',
      county_id: 10,
      sub_county_id: 102
    },
    {
      name: 'North hor',
      county_id: 10,
      sub_county_id: 103
    },
    {
      name: 'Saku',
      county_id: 10,
      sub_county_id: 104
    },
    {
      name: 'Isiolo',
      county_id: 11,
      sub_county_id: 111
    },
    {
      name: 'Merti',
      county_id: 11,
      sub_county_id: 112
    },
    {
      name: 'Garbatulla',
      county_id: 11,
      sub_county_id: 112
    },
    {
      name: 'Buuri',
      county_id: 12,
      sub_county_id: 121
    },
    {
      name: 'Igembe central',
      county_id: 12,
      sub_county_id: 122
    },
    {
      name: 'Igembe north',
      county_id: 12,
      sub_county_id: 123
    },
    {
      name: 'Igembe south',
      county_id: 12,
      sub_county_id: 124
    },
    {
      name: 'Imenti central',
      county_id: 12,
      sub_county_id: 125
    },
    {
      name: 'Imenti north',
      county_id: 12,
      sub_county_id: 126
    },
    {
      name: 'Imenti south',
      county_id: 12,
      sub_county_id: 127
    },
    {
      name: 'Tigania east',
      county_id: 12,
      sub_county_id: 128
    },
    {
      name: 'Tigania west',
      county_id: 12,
      sub_county_id: 129
    },
    {
      name: 'Chuka/Igambang’ombe',
      county_id: 13,
      sub_county_id: 131
    },
    {
      name: 'Maara',
      county_id: 13,
      sub_county_id: 132
    },
    {
      name: 'Tharaka',
      county_id: 13,
      sub_county_id: 133
    },
    {
      name: 'Manyatta',
      county_id: 14,
      sub_county_id: 141
    },
    {
      name: 'Mbeere north',
      county_id: 14,
      sub_county_id: 142
    },
    {
      name: 'Mbeere south',
      county_id: 14,
      sub_county_id: 143
    },
    {
      name: 'Runyenjes',
      county_id: 14,
      sub_county_id: 144
    },
    {
      name: 'Mwingi North',
      county_id: 15,
      sub_county_id: 151
    },
    {
      name: 'Mwingi West',
      county_id: 15,
      sub_county_id: 152
    },
    {
      name: 'Mwingi Central',
      county_id: 15,
      sub_county_id: 153
    },
    {
      name: 'Kitui West',
      county_id: 15,
      sub_county_id: 154
    },
    {
      name: 'Kitui Rural',
      county_id: 15,
      sub_county_id: 155
    },
    {
      name: 'Kitui Central',
      county_id: 15,
      sub_county_id: 156
    },
    {
      name: 'Kitui East',
      county_id: 15,
      sub_county_id: 157
    },
    {
      name: 'Kitui South',
      county_id: 15,
      sub_county_id: 158
    },
    {
      name: 'Masinga',
      county_id: 16,
      sub_county_id: 161
    },
    {
      name: 'Yatta',
      county_id: 16,
      sub_county_id: 162
    },
    {
      name: 'Kangundo',
      county_id: 16,
      sub_county_id: 163
    },
    {
      name: 'Matungulu',
      county_id: 16,
      sub_county_id: 164
    },
    {
      name: 'Kathiani',
      county_id: 16,
      sub_county_id: 165
    },
    {
      name: 'Mavoko',
      county_id: 16,
      sub_county_id: 166
    },
    {
      name: 'Machakos Town',
      county_id: 16,
      sub_county_id: 167
    },
    {
      name: 'Mwala',
      county_id: 16,
      sub_county_id: 168
    },
    {
      name: 'Mbooni',
      county_id: 17,
      sub_county_id: 171
    },
    {
      name: 'Kilome',
      county_id: 17,
      sub_county_id: 172
    },
    {
      name: 'Kaiti',
      county_id: 17,
      sub_county_id: 173
    },
    {
      name: 'Makueni',
      county_id: 17,
      sub_county_id: 174
    },
    {
      name: 'Kibwezi West',
      county_id: 17,
      sub_county_id: 175
    },
    {
      name: 'Kibwezi East',
      county_id: 17,
      sub_county_id: 176
    },
    {
      name: 'Kinangop',
      county_id: 18,
      sub_county_id: 181
    },
    {
      name: 'Kipipiri',
      county_id: 18,
      sub_county_id: 182
    },
    {
      name: 'Ol Kalou',
      county_id: 18,
      sub_county_id: 183
    },
    {
      name: 'Ol Jorok',
      county_id: 18,
      sub_county_id: 184
    },
    {
      name: 'Ndaragwa',
      county_id: 18,
      sub_county_id: 185
    },
    {
      name: 'Tetu',
      county_id: 19,
      sub_county_id: 191
    },
    {
      name: 'Kieni',
      county_id: 19,
      sub_county_id: 192
    },
    {
      name: 'Mathira',
      county_id: 19,
      sub_county_id: 193
    },
    {
      name: 'Othaya',
      county_id: 19,
      sub_county_id: 194
    },
    {
      name: 'Mukurweini',
      county_id: 19,
      sub_county_id: 195
    },
    {
      name: 'Nyeri Town',
      county_id: 19,
      sub_county_id: 196
    },
    {
      name: 'Mwea',
      county_id: 20,
      sub_county_id: 201
    },
    {
      name: 'Gichugu',
      county_id: 20,
      sub_county_id: 202
    },
    {
      name: 'Ndia',
      county_id: 20,
      sub_county_id: 203
    },
    {
      name: 'Kirinyaga Central',
      county_id: 20,
      sub_county_id: 204
    },
    {
      name: 'Kangema',
      county_id: 21,
      sub_county_id: 211
    },
    {
      name: 'Mathioya',
      county_id: 21,
      sub_county_id: 212
    },
    {
      name: 'Kiharu',
      county_id: 21,
      sub_county_id: 213
    },
    {
      name: 'Kigumo',
      county_id: 21,
      sub_county_id: 214
    },
    {
      name: 'Maragwa',
      county_id: 21,
      sub_county_id: 215
    },
    {
      name: 'Kandara',
      county_id: 21,
      sub_county_id: 216
    },
    {
      name: 'Gatanga',
      county_id: 21,
      sub_county_id: 217
    },
    {
      name: 'Gatundu South',
      county_id: 22,
      sub_county_id: 221
    },
    {
      name: 'Gatundu North',
      county_id: 22,
      sub_county_id: 222
    },
    {
      name: 'Juja',
      county_id: 22,
      sub_county_id: 223
    },
    {
      name: 'Thika Town',
      county_id: 22,
      sub_county_id: 224
    },
    {
      name: 'Ruiri',
      county_id: 22,
      sub_county_id: 225
    },
    {
      name: 'Githunguri',
      county_id: 22,
      sub_county_id: 226
    },
    {
      name: 'Kiambu',
      county_id: 22,
      sub_county_id: 227
    },
    {
      name: 'Kiambaa',
      county_id: 22,
      sub_county_id: 228
    },
    {
      name: 'Kabete',
      county_id: 22,
      sub_county_id: 229
    },
    {
      name: 'Kikuya',
      county_id: 22,
      sub_county_id: 2211
    },
    {
      name: 'Limuru',
      county_id: 22,
      sub_county_id: 2212
    },
    {
      name: 'Lari',
      county_id: 22,
      sub_county_id: 2213
    },
    {
      name: 'Turkana North',
      county_id: 23,
      sub_county_id: 231
    },
    {
      name: 'Turkana West',
      county_id: 23,
      sub_county_id: 232
    },
    {
      name: 'Turkana Central',
      county_id: 23,
      sub_county_id: 233
    },
    {
      name: 'Loima',
      county_id: 23,
      sub_county_id: 234
    },
    {
      name: 'Turkana South',
      county_id: 23,
      sub_county_id: 235
    },
    {
      name: 'Turkana East',
      county_id: 23,
      sub_county_id: 236
    },
    {
      name: 'Kapenguria',
      county_id: 24,
      sub_county_id: 241
    },
    {
      name: 'Sigor',
      county_id: 24,
      sub_county_id: 242
    },
    {
      name: 'Kacheliba',
      county_id: 24,
      sub_county_id: 243
    },
    {
      name: 'Pokot South',
      county_id: 24,
      sub_county_id: 244
    },
    {
      name: 'Samburu West',
      county_id: 25,
      sub_county_id: 251
    },
    {
      name: 'Samburu North',
      county_id: 25,
      sub_county_id: 252
    },
    {
      name: 'Samburu East',
      county_id: 25,
      sub_county_id: 253
    },
    {
      name: 'Kwanza',
      county_id: 26,
      sub_county_id: 261
    },
    {
      name: 'Endebess',
      county_id: 26,
      sub_county_id: 262
    },
    {
      name: 'Saboti',
      county_id: 26,
      sub_county_id: 263
    },
    {
      name: 'Kiminini',
      county_id: 26,
      sub_county_id: 264
    },
    {
      name: 'Cherangany',
      county_id: 26,
      sub_county_id: 265
    },
    {
      name: 'Soy',
      county_id: 27,
      sub_county_id: 271
    },
    {
      name: 'Turbo',
      county_id: 27,
      sub_county_id: 272
    },
    {
      name: 'Moiben',
      county_id: 27,
      sub_county_id: 273
    },
    {
      name: 'Ainabkoi',
      county_id: 27,
      sub_county_id: 274
    },
    {
      name: 'Kapseret',
      county_id: 27,
      sub_county_id: 275
    },
    {
      name: 'Kesses',
      county_id: 27,
      sub_county_id: 276
    },
    {
      name: 'Marakwet West',
      county_id: 28,
      sub_county_id: 281
    },
    {
      name: 'Marakwet East',
      county_id: 28,
      sub_county_id: 282
    },
    {
      name: 'Keiyo North',
      county_id: 28,
      sub_county_id: 283
    },
    {
      name: 'Keiyo South',
      county_id: 28,
      sub_county_id: 284
    },
    {
      name: 'Tinderet',
      county_id: 29,
      sub_county_id: 291
    },
    {
      name: 'Aldai',
      county_id: 29,
      sub_county_id: 292
    },
    {
      name: 'Nandi Hills',
      county_id: 29,
      sub_county_id: 293
    },
    {
      name: 'Chesumei',
      county_id: 29,
      sub_county_id: 294
    },
    {
      name: 'Emgwen',
      county_id: 29,
      sub_county_id: 295
    },
    {
      name: 'Mosop',
      county_id: 29,
      sub_county_id: 296
    },
    {
      name: 'Baringo central',
      county_id: 30,
      sub_county_id: 301
    },
    {
      name: 'Baringo North',
      county_id: 30,
      sub_county_id: 302
    },
    {
      name: 'Baringo South',
      county_id: 30,
      sub_county_id: 303
    },
    {
      name: 'Eldama ravine',
      county_id: 30,
      sub_county_id: 304
    },
    {
      name: 'Mogotio',
      county_id: 30,
      sub_county_id: 305
    },
    {
      name: 'Tiaty',
      county_id: 30,
      sub_county_id: 306
    },
    {
      name: 'Laikipia West',
      county_id: 31,
      sub_county_id: 311
    },
    {
      name: 'Laikipia East',
      county_id: 31,
      sub_county_id: 312
    },
    {
      name: 'Laikipia North',
      county_id: 31,
      sub_county_id: 313
    },
    {
      name: 'Molo',
      county_id: 32,
      sub_county_id: 321
    },
    {
      name: 'Njoro',
      county_id: 32,
      sub_county_id: 322
    },
    {
      name: 'Naivasha',
      county_id: 32,
      sub_county_id: 323
    },
    {
      name: 'Gilgil',
      county_id: 32,
      sub_county_id: 324
    },
    {
      name: 'Kuresoi South',
      county_id: 32,
      sub_county_id: 325
    },
    {
      name: 'Kuresoi North',
      county_id: 32,
      sub_county_id: 326
    },
    {
      name: 'Subukia',
      county_id: 32,
      sub_county_id: 327
    },
    {
      name: 'Rongai',
      county_id: 32,
      sub_county_id: 328
    },
    {
      name: 'Bahati',
      county_id: 32,
      sub_county_id: 329
    },
    {
      name: 'Nakuru Town West',
      county_id: 32,
      sub_county_id: 3211
    },
    {
      name: 'Nakuru Town East',
      county_id: 32,
      sub_county_id: 3212
    },
    {
      name: 'Kilgoris',
      county_id: 33,
      sub_county_id: 331
    },
    {
      name: 'Emurua Dikirr',
      county_id: 33,
      sub_county_id: 332
    },
    {
      name: 'Narok North',
      county_id: 33,
      sub_county_id: 333
    },
    {
      name: 'Narok East',
      county_id: 33,
      sub_county_id: 334
    },
    {
      name: 'Narok South',
      county_id: 33,
      sub_county_id: 335
    },
    {
      name: 'Narok West',
      county_id: 33,
      sub_county_id: 336
    },
    {
      name: 'Kajiado North',
      county_id: 34,
      sub_county_id: 341
    },
    {
      name: 'Kajiado Central',
      county_id: 34,
      sub_county_id: 342
    },
    {
      name: 'Kajiado East',
      county_id: 34,
      sub_county_id: 343
    },
    {
      name: 'Kajiado West',
      county_id: 34,
      sub_county_id: 344
    },
    {
      name: 'Kajiado South',
      county_id: 34,
      sub_county_id: 345
    },
    {
      name: 'Kipkelion West',
      county_id: 35,
      sub_county_id: 351
    },
    {
      name: 'Kipkelion East',
      county_id: 35,
      sub_county_id: 352
    },
    {
      name: 'Ainamoi',
      county_id: 35,
      sub_county_id: 353
    },
    {
      name: 'Bureti',
      county_id: 35,
      sub_county_id: 354
    },
    {
      name: 'Belgut',
      county_id: 35,
      sub_county_id: 355
    },
    {
      name: 'Sigowet/Soin',
      county_id: 35,
      sub_county_id: 356
    },
    {
      name: 'Bomet central',
      county_id: 36,
      sub_county_id: 361
    },
    {
      name: 'Konoin',
      county_id: 36,
      sub_county_id: 362
    },
    {
      name: 'Bomet East',
      county_id: 36,
      sub_county_id: 363
    },
    {
      name: 'Chepalungu',
      county_id: 36,
      sub_county_id: 364
    },
    {
      name: 'Sotik',
      county_id: 36,
      sub_county_id: 365
    },
    {
      name: 'Lugari',
      county_id: 37,
      sub_county_id: 371
    },
    {
      name: 'Likuyani',
      county_id: 37,
      sub_county_id: 372
    },
    {
      name: 'Malava',
      county_id: 37,
      sub_county_id: 373
    },
    {
      name: 'Lurambi',
      county_id: 37,
      sub_county_id: 374
    },
    {
      name: 'Navakholo',
      county_id: 37,
      sub_county_id: 375
    },
    {
      name: 'Mumias West',
      county_id: 37,
      sub_county_id: 376
    },
    {
      name: 'Mumias East',
      county_id: 37,
      sub_county_id: 377
    },
    {
      name: 'Matungu',
      county_id: 37,
      sub_county_id: 378
    },
    {
      name: 'Butere',
      county_id: 37,
      sub_county_id: 379
    },
    {
      name: 'Khwisero',
      county_id: 37,
      sub_county_id: 3711
    },
    {
      name: 'Shinyalu',
      county_id: 37,
      sub_county_id: 3712
    },
    {
      name: 'Ikolomani',
      county_id: 37,
      sub_county_id: 3713
    },
    {
      name: 'Vihiga',
      county_id: 38,
      sub_county_id: 381
    },
    {
      name: 'Sabatia',
      county_id: 38,
      sub_county_id: 382
    },
    {
      name: 'Hamisi',
      county_id: 38,
      sub_county_id: 383
    },
    {
      name: 'Luanda',
      county_id: 38,
      sub_county_id: 384
    },
    {
      name: 'Emuhaya',
      county_id: 38,
      sub_county_id: 385
    },
    {
      name: 'Bumula',
      county_id: 39,
      sub_county_id: 391
    },
    {
      name: 'Elgon',
      county_id: 39,
      sub_county_id: 392
    },
    {
      name: 'Sirisia',
      county_id: 39,
      sub_county_id: 393
    },
    {
      name: 'Kabuchai',
      county_id: 39,
      sub_county_id: 394
    },
    {
      name: 'Kanduyi',
      county_id: 39,
      sub_county_id: 395
    },
    {
      name: 'Webuye East',
      county_id: 39,
      sub_county_id: 396
    },
    {
      name: 'Webuye West',
      county_id: 39,
      sub_county_id: 397
    },
    {
      name: 'Kimilili',
      county_id: 39,
      sub_county_id: 398
    },
    {
      name: 'Tongaren',
      county_id: 39,
      sub_county_id: 399
    },
    {
      name: 'Teso North',
      county_id: 40,
      sub_county_id: 401
    },
    {
      name: 'Teso South',
      county_id: 40,
      sub_county_id: 402
    },
    {
      name: 'Nambale',
      county_id: 40,
      sub_county_id: 403
    },
    {
      name: 'Matayos',
      county_id: 40,
      sub_county_id: 404
    },
    {
      name: 'Butula',
      county_id: 40,
      sub_county_id: 405
    },
    {
      name: 'Funyula',
      county_id: 40,
      sub_county_id: 406
    },
    {
      name: 'Ugenya',
      county_id: 41,
      sub_county_id: 411
    },
    {
      name: 'Ugunja',
      county_id: 41,
      sub_county_id: 412
    },
    {
      name: 'Alego Usonga',
      county_id: 41,
      sub_county_id: 413
    },
    {
      name: 'Gem',
      county_id: 41,
      sub_county_id: 414
    },
    {
      name: 'Bondo',
      county_id: 41,
      sub_county_id: 415
    },
    {
      name: 'Rarieda',
      county_id: 41,
      sub_county_id: 416
    },
    {
      name: 'Kisumu East',
      county_id: 42,
      sub_county_id: 421
    },
    {
      name: 'Kisumu West',
      county_id: 42,
      sub_county_id: 422
    },
    {
      name: 'Kisumu Central',
      county_id: 42,
      sub_county_id: 423
    },
    {
      name: 'Seme',
      county_id: 42,
      sub_county_id: 424
    },
    {
      name: 'Nyando',
      county_id: 42,
      sub_county_id: 425
    },
    {
      name: 'Muhoroni',
      county_id: 42,
      sub_county_id: 426
    },
    {
      name: 'Nyakach',
      county_id: 42,
      sub_county_id: 427
    },
    {
      name: 'Kasipul',
      county_id: 43,
      sub_county_id: 431
    },
    {
      name: 'Kabondo Kasipul',
      county_id: 43,
      sub_county_id: 432
    },
    {
      name: 'Karachuonyo',
      county_id: 43,
      sub_county_id: 433
    },
    {
      name: 'Rangwe',
      county_id: 43,
      sub_county_id: 434
    },
    {
      name: 'Homa Bay Town',
      county_id: 43,
      sub_county_id: 435
    },
    {
      name: 'Ndhiwa',
      county_id: 43,
      sub_county_id: 436
    },
    {
      name: 'Mbita',
      county_id: 43,
      sub_county_id: 437
    },
    {
      name: 'Suba',
      county_id: 43,
      sub_county_id: 438
    },
    {
      name: 'Rongo',
      county_id: 44,
      sub_county_id: 441
    },
    {
      name: 'Awendo',
      county_id: 44,
      sub_county_id: 442
    },
    {
      name: 'Suna East',
      county_id: 44,
      sub_county_id: 443
    },
    {
      name: 'Suna West',
      county_id: 44,
      sub_county_id: 444
    },
    {
      name: 'Uriri',
      county_id: 44,
      sub_county_id: 445
    },
    {
      name: 'Nyatike',
      county_id: 44,
      sub_county_id: 446
    },
    {
      name: 'Kuria West',
      county_id: 44,
      sub_county_id: 447
    },
    {
      name: 'Kuria East',
      county_id: 44,
      sub_county_id: 448
    },
    {
      name: 'Bonchari',
      county_id: 45,
      sub_county_id: 451
    },
    {
      name: 'South Mugirango',
      county_id: 45,
      sub_county_id: 452
    },
    {
      name: 'Bomachoge Borabu',
      county_id: 45,
      sub_county_id: 453
    },
    {
      name: 'Bobasi',
      county_id: 45,
      sub_county_id: 454
    },
    {
      name: 'Bomachoge Chache',
      county_id: 45,
      sub_county_id: 455
    },
    {
      name: 'Nyaribari Masaba',
      county_id: 45,
      sub_county_id: 456
    },
    {
      name: 'Nyaribari Chache',
      county_id: 45,
      sub_county_id: 457
    },
    {
      name: 'Kitutu Chache North',
      county_id: 45,
      sub_county_id: 458
    },
    {
      name: 'Kitutu Chache South',
      county_id: 45,
      sub_county_id: 459
    },
    {
      name: 'Kitutu Masaba',
      county_id: 46,
      sub_county_id: 461
    },
    {
      name: 'West Mugirango',
      county_id: 46,
      sub_county_id: 462
    },
    {
      name: 'North Mugirango',
      county_id: 46,
      sub_county_id: 463
    },
    {
      name: 'Borabu',
      county_id: 46,
      sub_county_id: 464
    },
    {
      name: 'Westlands',
      county_id: 47,
      sub_county_id: 471
    },
    {
      name: 'Dagoretti North',
      county_id: 47,
      sub_county_id: 472
    },
    {
      name: 'Dagoretti South',
      county_id: 47,
      sub_county_id: 473
    },
    {
      name: 'Langata',
      county_id: 47,
      sub_county_id: 474
    },
    {
      name: 'Kibra',
      county_id: 47,
      sub_county_id: 475
    },
    {
      name: 'Roysambu',
      county_id: 47,
      sub_county_id: 476
    },
    {
      name: 'Kasarani',
      county_id: 47,
      sub_county_id: 477
    },
    {
      name: 'Ruaraka',
      county_id: 47,
      sub_county_id: 478
    },
    {
      name: 'Embakasi South',
      county_id: 47,
      sub_county_id: 479
    },
    {
      name: 'Embakasi North',
      county_id: 47,
      sub_county_id: 4711
    },
    {
      name: 'Embakasi Central',
      county_id: 47,
      sub_county_id: 4712
    },
    {
      name: 'Embakasi East',
      county_id: 47,
      sub_county_id: 4713
    },
    {
      name: 'Embakasi West',
      county_id: 47,
      sub_county_id: 4714
    },
    {
      name: 'Makadara',
      county_id: 47,
      sub_county_id: 4715
    },
    {
      name: 'Kamkunji',
      county_id: 47,
      sub_county_id: 4716
    },
    {
      name: 'Starehe',
      county_id: 47,
      sub_county_id: 4717
    },
    {
      name: 'Mathare',
      county_id: 47,
      sub_county_id: 4718
    }
  ],
  wards: [
    {
      name: 'Port Reitz',
      sub_county_id: 111
    },
    {
      name: 'Kipevu',
      sub_county_id: 111
    },
    {
      name: 'Airport',
      sub_county_id: 111
    },
    {
      name: 'Miritini',
      sub_county_id: 111
    },
    {
      name: 'Chaani',
      sub_county_id: 111
    },
    {
      name: 'Jomvu Kuu',
      sub_county_id: 112
    },
    {
      name: 'Magongo',
      sub_county_id: 112
    },
    {
      name: 'Mikindani',
      sub_county_id: 112
    },
    {
      name: 'Mjambere',
      sub_county_id: 113
    },
    {
      name: 'Junda',
      sub_county_id: 113
    },
    {
      name: 'Bamburi',
      sub_county_id: 113
    },
    {
      name: 'Mwakirunge',
      sub_county_id: 113
    },
    {
      name: 'Mtopanga',
      sub_county_id: 113
    },
    {
      name: 'Magogoni',
      sub_county_id: 113
    },
    {
      name: 'Shanzu',
      sub_county_id: 113
    },
    {
      name: 'Mji Wa Kale/Makadara',
      sub_county_id: 114
    },
    {
      name: 'Tudor',
      sub_county_id: 114
    },
    {
      name: 'Tononoka',
      sub_county_id: 114
    },
    {
      name: 'Shimanzi/Ganjoni',
      sub_county_id: 114
    },
    {
      name: 'Majengo',
      sub_county_id: 114
    },
    {
      name: 'Frere Town',
      sub_county_id: 115
    },
    {
      name: 'Ziwa La Ng’ombe',
      sub_county_id: 115
    },
    {
      name: 'Mkomani',
      sub_county_id: 115
    },
    {
      name: 'Kongowea',
      sub_county_id: 115
    },
    {
      name: 'Kadzandani',
      sub_county_id: 115
    },
    {
      name: 'Mtongwe',
      sub_county_id: 116
    },
    {
      name: 'Shika Adabu',
      sub_county_id: 116
    },
    {
      name: 'Bofu',
      sub_county_id: 116
    },
    {
      name: 'Likoni',
      sub_county_id: 116
    },
    {
      name: 'Timbwani',
      sub_county_id: 116
    },
    {
      name: 'Ndavaya',
      sub_county_id: 211
    },
    {
      name: 'Puma',
      sub_county_id: 211
    },
    {
      name: 'Kinango',
      sub_county_id: 211
    },
    {
      name: 'Chengoni/Samburu',
      sub_county_id: 211
    },
    {
      name: 'Mackinon Road',
      sub_county_id: 211
    },
    {
      name: 'Mwavumbo',
      sub_county_id: 211
    },
    {
      name: 'Kasemeni',
      sub_county_id: 211
    },
    {
      name: 'Pongwe',
      sub_county_id: 212
    },
    {
      name: 'Kikoneni',
      sub_county_id: 212
    },
    {
      name: 'Dzombo',
      sub_county_id: 212
    },
    {
      name: 'Vanga',
      sub_county_id: 212
    },
    {
      name: 'Mwereni',
      sub_county_id: 212
    },
    {
      name: 'Gombato Bongwe',
      sub_county_id: 213
    },
    {
      name: 'Ukunda',
      sub_county_id: 213
    },
    {
      name: 'Kinondo',
      sub_county_id: 213
    },
    {
      name: 'Ramisi',
      sub_county_id: 213
    },
    {
      name: 'Tsimba Golini',
      sub_county_id: 214
    },
    {
      name: 'Waa',
      sub_county_id: 214
    },
    {
      name: 'Tiwi',
      sub_county_id: 214
    },
    {
      name: 'Kubo South',
      sub_county_id: 214
    },
    {
      name: 'Mkongani',
      sub_county_id: 214
    },
    {
      name: 'Mariakani',
      sub_county_id: 311
    },
    {
      name: 'Kayafungo',
      sub_county_id: 311
    },
    {
      name: 'Kaloleni',
      sub_county_id: 311
    },
    {
      name: 'Mwanamwinga',
      sub_county_id: 311
    },
    {
      name: 'Dungicha',
      sub_county_id: 312
    },
    {
      name: 'Bamba',
      sub_county_id: 312
    },
    {
      name: 'Jaribuni',
      sub_county_id: 312
    },
    {
      name: 'Sokoke',
      sub_county_id: 312
    },
    {
      name: 'Tezo',
      sub_county_id: 313
    },
    {
      name: 'Sokoni',
      sub_county_id: 313
    },
    {
      name: 'Kibarani',
      sub_county_id: 313
    },
    {
      name: 'Dabaso',
      sub_county_id: 313
    },
    {
      name: 'Matsangoni',
      sub_county_id: 313
    },
    {
      name: 'Watamu',
      sub_county_id: 313
    },
    {
      name: 'Mnarani',
      sub_county_id: 313
    },
    {
      name: 'Junju',
      sub_county_id: 314
    },
    {
      name: 'Mwarakaya',
      sub_county_id: 314
    },
    {
      name: 'Shimo la Tewa',
      sub_county_id: 314
    },
    {
      name: 'Chasimba',
      sub_county_id: 314
    },
    {
      name: 'Mtepeni',
      sub_county_id: 314
    },
    {
      name: 'Maarafa',
      sub_county_id: 315
    },
    {
      name: 'Magarini',
      sub_county_id: 315
    },
    {
      name: 'Gongoni',
      sub_county_id: 315
    },
    {
      name: 'Adu',
      sub_county_id: 315
    },
    {
      name: 'Garashi',
      sub_county_id: 315
    },
    {
      name: 'Sabaki',
      sub_county_id: 315
    },
    {
      name: 'Jilore',
      sub_county_id: 316
    },
    {
      name: 'Kakuyuni',
      sub_county_id: 316
    },
    {
      name: 'Ganda',
      sub_county_id: 316
    },
    {
      name: 'Malindi Town',
      sub_county_id: 316
    },
    {
      name: 'Shella',
      sub_county_id: 316
    },
    {
      name: 'Mwawesa',
      sub_county_id: 317
    },
    {
      name: 'Ruruma',
      sub_county_id: 317
    },
    {
      name: 'Jibana',
      sub_county_id: 317
    },
    {
      name: 'Rabai/Kisurutuni',
      sub_county_id: 317
    },
    {
      name: 'Chewele',
      sub_county_id: 411
    },
    {
      name: 'Hirimani',
      sub_county_id: 411
    },
    {
      name: 'Bangale',
      sub_county_id: 411
    },
    {
      name: 'Sala',
      sub_county_id: 411
    },
    {
      name: 'Madogo',
      sub_county_id: 411
    },
    {
      name: 'Kinakomba',
      sub_county_id: 412
    },
    {
      name: 'Mikinduni',
      sub_county_id: 412
    },
    {
      name: 'Chewani',
      sub_county_id: 412
    },
    {
      name: 'Wayu',
      sub_county_id: 412
    },
    {
      name: 'Kipini East',
      sub_county_id: 413
    },
    {
      name: 'Garsen South',
      sub_county_id: 413
    },
    {
      name: 'Kipini West',
      sub_county_id: 413
    },
    {
      name: 'Garsen Central',
      sub_county_id: 413
    },
    {
      name: 'Garsen West',
      sub_county_id: 413
    },
    {
      name: 'Garsen North',
      sub_county_id: 413
    },
    {
      name: 'Faza',
      sub_county_id: 511
    },
    {
      name: 'Kiunga',
      sub_county_id: 511
    },
    {
      name: 'Basuba',
      sub_county_id: 511
    },
    {
      name: 'Shella',
      sub_county_id: 512
    },
    {
      name: 'Mkomani',
      sub_county_id: 512
    },
    {
      name: 'Hindi',
      sub_county_id: 512
    },
    {
      name: 'Mkunumbi',
      sub_county_id: 512
    },
    {
      name: 'Hongwe',
      sub_county_id: 512
    },
    {
      name: 'Witu',
      sub_county_id: 512
    },
    {
      name: 'Bahari',
      sub_county_id: 512
    },
    {
      name: 'Ronge',
      sub_county_id: 611
    },
    {
      name: 'Mwatate',
      sub_county_id: 611
    },
    {
      name: 'Bura',
      sub_county_id: 611
    },
    {
      name: 'Chawia',
      sub_county_id: 611
    },
    {
      name: 'Wusi/Kishamba',
      sub_county_id: 611
    },
    {
      name: 'Chala',
      sub_county_id: 612
    },
    {
      name: 'Mahoo',
      sub_county_id: 612
    },
    {
      name: 'Bomani',
      sub_county_id: 612
    },
    {
      name: 'Mboghoni',
      sub_county_id: 612
    },
    {
      name: 'Mata',
      sub_county_id: 612
    },
    {
      name: 'Mbololo',
      sub_county_id: 613
    },
    {
      name: 'Kaloleni',
      sub_county_id: 613
    },
    {
      name: 'Sagala',
      sub_county_id: 613
    },
    {
      name: 'Marungu',
      sub_county_id: 613
    },
    {
      name: 'Kaigau',
      sub_county_id: 613
    },
    {
      name: 'Ngolia',
      sub_county_id: 613
    },
    {
      name: 'Wundanyi/Mbale',
      sub_county_id: 614
    },
    {
      name: 'Werugha',
      sub_county_id: 614
    },
    {
      name: 'Wumingu/Kishushe',
      sub_county_id: 614
    },
    {
      name: 'Mwanda/Mgange',
      sub_county_id: 614
    },
    {
      name: 'Dertu',
      sub_county_id: 711
    },
    {
      name: 'Dadaab',
      sub_county_id: 711
    },
    {
      name: 'Labasigale',
      sub_county_id: 711
    },
    {
      name: 'Damajale',
      sub_county_id: 711
    },
    {
      name: 'Liboi',
      sub_county_id: 711
    },
    {
      name: 'Abakaile',
      sub_county_id: 711
    },
    {
      name: 'Bura',
      sub_county_id: 712
    },
    {
      name: 'Dekaharia',
      sub_county_id: 712
    },
    {
      name: 'Jarajila',
      sub_county_id: 712
    },
    {
      name: 'Fafi',
      sub_county_id: 712
    },
    {
      name: 'Nanighi',
      sub_county_id: 712
    },
    {
      name: 'Waberi',
      sub_county_id: 713
    },
    {
      name: 'Galbet',
      sub_county_id: 713
    },
    {
      name: 'Township',
      sub_county_id: 713
    },
    {
      name: 'Iftin',
      sub_county_id: 713
    },
    {
      name: 'Hulugho',
      sub_county_id: 714
    },
    {
      name: 'Sangailu',
      sub_county_id: 714
    },
    {
      name: 'Ijara',
      sub_county_id: 714
    },
    {
      name: 'Masalani',
      sub_county_id: 714
    },
    {
      name: 'Balambala',
      sub_county_id: 715
    },
    {
      name: 'Danyere',
      sub_county_id: 715
    },
    {
      name: 'Jarajara',
      sub_county_id: 715
    },
    {
      name: 'Saka',
      sub_county_id: 715
    },
    {
      name: 'Sankuri',
      sub_county_id: 715
    },
    {
      name: 'Modogashe',
      sub_county_id: 716
    },
    {
      name: 'Bename',
      sub_county_id: 716
    },
    {
      name: 'Goreale',
      sub_county_id: 716
    },
    {
      name: 'Maalamin',
      sub_county_id: 716
    },
    {
      name: 'Sabena',
      sub_county_id: 716
    },
    {
      name: 'Baraki',
      sub_county_id: 716
    },
    {
      name: 'Eldas',
      sub_county_id: 811
    },
    {
      name: 'Della',
      sub_county_id: 811
    },
    {
      name: 'Lakoley South/Basir',
      sub_county_id: 811
    },
    {
      name: 'Elnur/Tula Tula',
      sub_county_id: 811
    },
    {
      name: 'Wagbri',
      sub_county_id: 812
    },
    {
      name: 'Township',
      sub_county_id: 812
    },
    {
      name: 'Barwago',
      sub_county_id: 812
    },
    {
      name: 'Khorof/Harar',
      sub_county_id: 812
    },
    {
      name: 'Gurar',
      sub_county_id: 813
    },
    {
      name: 'Bute',
      sub_county_id: 813
    },
    {
      name: 'Korondile',
      sub_county_id: 813
    },
    {
      name: 'Malkagufu',
      sub_county_id: 813
    },
    {
      name: 'Batalu',
      sub_county_id: 813
    },
    {
      name: 'Danaba',
      sub_county_id: 813
    },
    {
      name: 'Godoma',
      sub_county_id: 813
    },
    {
      name: 'Benane',
      sub_county_id: 814
    },
    {
      name: 'Burder',
      sub_county_id: 814
    },
    {
      name: 'Dadaja Bulla',
      sub_county_id: 814
    },
    {
      name: 'Habaswein',
      sub_county_id: 814
    },
    {
      name: 'Lagboghol South',
      sub_county_id: 814
    },
    {
      name: 'Ibrahim Ure',
      sub_county_id: 814
    },
    {
      name: 'Arbajahan',
      sub_county_id: 815
    },
    {
      name: 'Hadado/Athibohol',
      sub_county_id: 815
    },
    {
      name: 'Ademasajide',
      sub_county_id: 815
    },
    {
      name: 'Ganyure',
      sub_county_id: 815
    },
    {
      name: 'Wagalla',
      sub_county_id: 815
    },
    {
      name: 'Banissa',
      sub_county_id: 911
    },
    {
      name: 'Derkhale',
      sub_county_id: 911
    },
    {
      name: 'Guba',
      sub_county_id: 911
    },
    {
      name: 'Malkamari',
      sub_county_id: 911
    },
    {
      name: 'Kiliwehiri',
      sub_county_id: 911
    },
    {
      name: 'Lafey',
      sub_county_id: 912
    },
    {
      name: 'Sala',
      sub_county_id: 912
    },
    {
      name: 'Fino',
      sub_county_id: 912
    },
    {
      name: 'Waranqara',
      sub_county_id: 912
    },
    {
      name: 'Alango Gof',
      sub_county_id: 912
    },
    {
      name: 'Arabia',
      sub_county_id: 913
    },
    {
      name: 'Libehia',
      sub_county_id: 913
    },
    {
      name: 'Khalalio',
      sub_county_id: 913
    },
    {
      name: 'Neboi',
      sub_county_id: 913
    },
    {
      name: 'Township',
      sub_county_id: 913
    },
    {
      name: 'Ashabito',
      sub_county_id: 914
    },
    {
      name: 'Guticha',
      sub_county_id: 914
    },
    {
      name: 'Marothile',
      sub_county_id: 914
    },
    {
      name: 'Rhamu',
      sub_county_id: 914
    },
    {
      name: 'Rhamu Dimtu',
      sub_county_id: 914
    },
    {
      name: 'Wargadou',
      sub_county_id: 915
    },
    {
      name: 'Kutulo',
      sub_county_id: 915
    },
    {
      name: 'Elwak South',
      sub_county_id: 915
    },
    {
      name: 'Elwak North',
      sub_county_id: 915
    },
    {
      name: 'Shimbir Fatuma',
      sub_county_id: 915
    },
    {
      name: 'Takaba South',
      sub_county_id: 916
    },
    {
      name: 'Takaba',
      sub_county_id: 916
    },
    {
      name: 'Lagsure',
      sub_county_id: 916
    },
    {
      name: 'Dandu',
      sub_county_id: 916
    },
    {
      name: 'Gither',
      sub_county_id: 916
    },
    {
      name: 'Loiyangalani',
      sub_county_id: 101
    },
    {
      name: 'Kargi/South Horr',
      sub_county_id: 101
    },
    {
      name: 'Korr/Ngurunit',
      sub_county_id: 101
    },
    {
      name: 'Logo Logo',
      sub_county_id: 101
    },
    {
      name: 'Laisamis',
      sub_county_id: 101
    },
    {
      name: 'Butiye',
      sub_county_id: 102
    },
    {
      name: 'Sololo',
      sub_county_id: 102
    },
    {
      name: 'Heillu/Manyatta',
      sub_county_id: 102
    },
    {
      name: 'Golbo',
      sub_county_id: 102
    },
    {
      name: 'Moyale Township',
      sub_county_id: 102
    },
    {
      name: 'Uran',
      sub_county_id: 102
    },
    {
      name: 'Obbu',
      sub_county_id: 102
    },
    {
      name: 'Dukana',
      sub_county_id: 103
    },
    {
      name: 'Maikona',
      sub_county_id: 103
    },
    {
      name: 'Turbi',
      sub_county_id: 103
    },
    {
      name: 'North Horr',
      sub_county_id: 103
    },
    {
      name: 'Illeret',
      sub_county_id: 103
    },
    {
      name: 'Sagate/Jaldesa',
      sub_county_id: 104
    },
    {
      name: 'Karare',
      sub_county_id: 104
    },
    {
      name: 'Marsabit Central',
      sub_county_id: 104
    },
    {
      name: 'Wabera',
      sub_county_id: 111
    },
    {
      name: 'Bulla Pesa',
      sub_county_id: 111
    },
    {
      name: 'Chari',
      sub_county_id: 111
    },
    {
      name: 'Cherab',
      sub_county_id: 111
    },
    {
      name: 'Ngare Mara',
      sub_county_id: 111
    },
    {
      name: 'Burat',
      sub_county_id: 111
    },
    {
      name: 'Oldo/Nyiro',
      sub_county_id: 111
    },
    {
      name: 'Garba Tula',
      sub_county_id: 112
    },
    {
      name: 'Kina',
      sub_county_id: 112
    },
    {
      name: 'Sericho',
      sub_county_id: 112
    },
    {
      name: 'Timau',
      sub_county_id: 121
    },
    {
      name: 'Kisima',
      sub_county_id: 121
    },
    {
      name: 'Kiirua/Naari',
      sub_county_id: 121
    },
    {
      name: 'Ruiri/Rwarera',
      sub_county_id: 121
    },
    {
      name: 'Akirang’ondu',
      sub_county_id: 122
    },
    {
      name: 'Athiru',
      sub_county_id: 122
    },
    {
      name: 'Ruujine',
      sub_county_id: 122
    },
    {
      name: 'Igembe East Njia',
      sub_county_id: 122
    },
    {
      name: 'Kangeta',
      sub_county_id: 122
    },
    {
      name: 'Antuambui',
      sub_county_id: 123
    },
    {
      name: 'Ntunene',
      sub_county_id: 123
    },
    {
      name: 'Antubetwe Kiongo',
      sub_county_id: 123
    },
    {
      name: 'Naathui',
      sub_county_id: 123
    },
    {
      name: 'Amwathi',
      sub_county_id: 123
    },
    {
      name: 'Maua',
      sub_county_id: 124
    },
    {
      name: 'Kegoi/Antubochiu',
      sub_county_id: 124
    },
    {
      name: 'Athiru',
      sub_county_id: 124
    },
    {
      name: 'Gaiti',
      sub_county_id: 124
    },
    {
      name: 'Akachiu',
      sub_county_id: 124
    },
    {
      name: 'Kanuni',
      sub_county_id: 124
    },
    {
      name: 'Mwanganthia',
      sub_county_id: 125
    },
    {
      name: 'Abothuguchi Central',
      sub_county_id: 125
    },
    {
      name: 'Abothuguchi Wes',
      sub_county_id: 125
    },
    {
      name: 'Kiagu',
      sub_county_id: 125
    },
    {
      name: 'Kibirichia',
      sub_county_id: 125
    },
    {
      name: 'Municipality',
      sub_county_id: 126
    },
    {
      name: 'ntima East',
      sub_county_id: 126
    },
    {
      name: 'Ntima West',
      sub_county_id: 126
    },
    {
      name: 'Nyaki West',
      sub_county_id: 126
    },
    {
      name: 'Nyaki East',
      sub_county_id: 126
    },
    {
      name: 'Mitunguu',
      sub_county_id: 127
    },
    {
      name: 'Igoji East',
      sub_county_id: 127
    },
    {
      name: 'Igoji West',
      sub_county_id: 127
    },
    {
      name: 'Abogeta East',
      sub_county_id: 127
    },
    {
      name: 'Abogeta West',
      sub_county_id: 127
    },
    {
      name: 'Nkuene',
      sub_county_id: 127
    },
    {
      name: 'Thangatha',
      sub_county_id: 128
    },
    {
      name: 'Mikinduri',
      sub_county_id: 128
    },
    {
      name: 'Kiguchwa',
      sub_county_id: 128
    },
    {
      name: 'Mithara',
      sub_county_id: 128
    },
    {
      name: 'Karama',
      sub_county_id: 128
    },
    {
      name: 'Athwana',
      sub_county_id: 129
    },
    {
      name: 'Akithi',
      sub_county_id: 129
    },
    {
      name: 'Kianjai',
      sub_county_id: 129
    },
    {
      name: 'Nkomo',
      sub_county_id: 129
    },
    {
      name: 'Mbeu',
      sub_county_id: 129
    },
    {
      name: 'Mariani',
      sub_county_id: 131
    },
    {
      name: 'Karingani',
      sub_county_id: 131
    },
    {
      name: 'Magumoni',
      sub_county_id: 131
    },
    {
      name: 'Mugwe',
      sub_county_id: 131
    },
    {
      name: 'Igambang’ombe',
      sub_county_id: 131
    },
    {
      name: 'Mitheru',
      sub_county_id: 132
    },
    {
      name: 'Muthambi',
      sub_county_id: 132
    },
    {
      name: 'Mwimbi',
      sub_county_id: 132
    },
    {
      name: 'Ganga',
      sub_county_id: 132
    },
    {
      name: 'Chogoria',
      sub_county_id: 132
    },
    {
      name: 'Gatunga',
      sub_county_id: 133
    },
    {
      name: 'Mukothima',
      sub_county_id: 133
    },
    {
      name: 'Nkondi',
      sub_county_id: 133
    },
    {
      name: 'Chiakariga',
      sub_county_id: 133
    },
    {
      name: 'Marimanti',
      sub_county_id: 133
    },
    {
      name: 'Ruguru/Ngandori',
      sub_county_id: 141
    },
    {
      name: 'Kithimu',
      sub_county_id: 141
    },
    {
      name: 'Nginda',
      sub_county_id: 141
    },
    {
      name: 'Mbeti North',
      sub_county_id: 141
    },
    {
      name: 'Kirimari',
      sub_county_id: 141
    },
    {
      name: 'Gaturi South',
      sub_county_id: 141
    },
    {
      name: 'Nthawa',
      sub_county_id: 142
    },
    {
      name: 'Muminji',
      sub_county_id: 142
    },
    {
      name: 'Evurore',
      sub_county_id: 142
    },
    {
      name: 'Mwea',
      sub_county_id: 143
    },
    {
      name: 'Amakim',
      sub_county_id: 143
    },
    {
      name: 'Mbeti South',
      sub_county_id: 143
    },
    {
      name: 'Mavuria',
      sub_county_id: 143
    },
    {
      name: 'Kiambere',
      sub_county_id: 143
    },
    {
      name: 'Gaturi North',
      sub_county_id: 144
    },
    {
      name: 'Kagaari South',
      sub_county_id: 144
    },
    {
      name: 'Kagaari North',
      sub_county_id: 144
    },
    {
      name: 'Central Ward',
      sub_county_id: 144
    },
    {
      name: 'Kyeni Nort',
      sub_county_id: 144
    },
    {
      name: 'Kyeni South',
      sub_county_id: 144
    },
    {
      name: 'Ngomeni',
      sub_county_id: 151
    },
    {
      name: 'Kyuso',
      sub_county_id: 151
    },
    {
      name: 'Mumoni',
      sub_county_id: 151
    },
    {
      name: 'Tseikuru',
      sub_county_id: 151
    },
    {
      name: 'Tharaka',
      sub_county_id: 151
    },
    {
      name: 'Kyome/Thaana',
      sub_county_id: 152
    },
    {
      name: 'Nguutani',
      sub_county_id: 152
    },
    {
      name: 'Migwani',
      sub_county_id: 152
    },
    {
      name: 'Kiomo/Kyethani',
      sub_county_id: 152
    },
    {
      name: 'Central',
      sub_county_id: 153
    },
    {
      name: 'Kivou',
      sub_county_id: 153
    },
    {
      name: 'Nguni',
      sub_county_id: 153
    },
    {
      name: 'Nuu',
      sub_county_id: 153
    },
    {
      name: 'Mui',
      sub_county_id: 153
    },
    {
      name: 'Waita',
      sub_county_id: 153
    },
    {
      name: 'Mutonguni',
      sub_county_id: 154
    },
    {
      name: 'Kauwi',
      sub_county_id: 154
    },
    {
      name: 'Matinyani',
      sub_county_id: 154
    },
    {
      name: 'Kwa Mutonga/Kithum Ula',
      sub_county_id: 154
    },
    {
      name: 'Kisasi',
      sub_county_id: 155
    },
    {
      name: 'Mbitini',
      sub_county_id: 155
    },
    {
      name: 'Kwavonza/Yatta',
      sub_county_id: 155
    },
    {
      name: 'Kanyangi',
      sub_county_id: 155
    },
    {
      name: 'Miambani',
      sub_county_id: 156
    },
    {
      name: 'Township',
      sub_county_id: 156
    },
    {
      name: 'Kyangwithya West',
      sub_county_id: 156
    },
    {
      name: 'Mulango',
      sub_county_id: 156
    },
    {
      name: 'Kyangwithya East',
      sub_county_id: 156
    },
    {
      name: 'Zombe/Mwitika',
      sub_county_id: 157
    },
    {
      name: 'Nzambani',
      sub_county_id: 157
    },
    {
      name: 'Chuluni',
      sub_county_id: 157
    },
    {
      name: 'Voo/Kyamatu',
      sub_county_id: 157
    },
    {
      name: 'Endau/Malalani',
      sub_county_id: 157
    },
    {
      name: 'Mutito/Kaliku',
      sub_county_id: 157
    },
    {
      name: 'Ikana/Kyantune',
      sub_county_id: 158
    },
    {
      name: 'Mutomo',
      sub_county_id: 158
    },
    {
      name: 'Mutha',
      sub_county_id: 158
    },
    {
      name: 'Ikutha',
      sub_county_id: 158
    },
    {
      name: 'Kanziko',
      sub_county_id: 158
    },
    {
      name: 'Athi',
      sub_county_id: 158
    },
    {
      name: 'Kivaa',
      sub_county_id: 161
    },
    {
      name: 'Masinga Central',
      sub_county_id: 161
    },
    {
      name: 'Ekalakala',
      sub_county_id: 161
    },
    {
      name: 'Muthesya',
      sub_county_id: 161
    },
    {
      name: 'ndithini',
      sub_county_id: 161
    },
    {
      name: 'Ndalani',
      sub_county_id: 162
    },
    {
      name: 'Matuu',
      sub_county_id: 162
    },
    {
      name: 'Kithimani',
      sub_county_id: 162
    },
    {
      name: 'Ikomba',
      sub_county_id: 162
    },
    {
      name: 'Katangi',
      sub_county_id: 162
    },
    {
      name: 'Kangundo North',
      sub_county_id: 163
    },
    {
      name: 'Kangundo Central',
      sub_county_id: 163
    },
    {
      name: 'Kangundo East',
      sub_county_id: 163
    },
    {
      name: 'Kangundo West',
      sub_county_id: 163
    },
    {
      name: 'Tala',
      sub_county_id: 164
    },
    {
      name: 'Matungulu North',
      sub_county_id: 164
    },
    {
      name: 'Matungulu East',
      sub_county_id: 164
    },
    {
      name: 'Matungulu West',
      sub_county_id: 164
    },
    {
      name: 'Kyeleni',
      sub_county_id: 164
    },
    {
      name: 'Mitaboni',
      sub_county_id: 165
    },
    {
      name: 'Kathiani Central',
      sub_county_id: 165
    },
    {
      name: 'Upper Kaewa/Iveti',
      sub_county_id: 165
    },
    {
      name: 'Lower Kaewa/Kaani',
      sub_county_id: 165
    },
    {
      name: 'Athi River',
      sub_county_id: 166
    },
    {
      name: 'Kinanie',
      sub_county_id: 166
    },
    {
      name: 'Muthwani',
      sub_county_id: 166
    },
    {
      name: 'Syokimau/Mulolongo',
      sub_county_id: 166
    },
    {
      name: 'Kalama',
      sub_county_id: 167
    },
    {
      name: 'Mua',
      sub_county_id: 167
    },
    {
      name: 'Mutitini',
      sub_county_id: 167
    },
    {
      name: 'Machakos Central',
      sub_county_id: 167
    },
    {
      name: 'Mumbuni North',
      sub_county_id: 167
    },
    {
      name: 'Muvuti/Kiima-Kimwe',
      sub_county_id: 167
    },
    {
      name: 'Kola',
      sub_county_id: 167
    },
    {
      name: 'Mbiuni',
      sub_county_id: 168
    },
    {
      name: 'Makutano/Mwala',
      sub_county_id: 168
    },
    {
      name: 'Masii',
      sub_county_id: 168
    },
    {
      name: 'Muthetheni',
      sub_county_id: 168
    },
    {
      name: 'Wamunyu',
      sub_county_id: 168
    },
    {
      name: 'Kibauni',
      sub_county_id: 168
    },
    {
      name: 'Tulimani',
      sub_county_id: 171
    },
    {
      name: 'Mbooni',
      sub_county_id: 171
    },
    {
      name: 'Kithungo/Kitundu',
      sub_county_id: 171
    },
    {
      name: 'Kiteta/Kisau',
      sub_county_id: 171
    },
    {
      name: 'Waia-Kako',
      sub_county_id: 171
    },
    {
      name: 'Kalawa',
      sub_county_id: 171
    },
    {
      name: 'Kasikeu',
      sub_county_id: 172
    },
    {
      name: 'Mukaa',
      sub_county_id: 172
    },
    {
      name: 'Kiima Kiu/Kalanzoni',
      sub_county_id: 172
    },
    {
      name: 'Ukia',
      sub_county_id: 173
    },
    {
      name: 'Kee',
      sub_county_id: 173
    },
    {
      name: 'Kilungu',
      sub_county_id: 173
    },
    {
      name: 'Ilima',
      sub_county_id: 173
    },
    {
      name: 'Wote',
      sub_county_id: 174
    },
    {
      name: 'Muvau/Kikuumini',
      sub_county_id: 174
    },
    {
      name: 'Mavindini',
      sub_county_id: 174
    },
    {
      name: 'Kitise/Kithuki',
      sub_county_id: 174
    },
    {
      name: 'Kathonzweni',
      sub_county_id: 174
    },
    {
      name: 'Nzau/Kilili/Kalamba',
      sub_county_id: 174
    },
    {
      name: 'Mbitini',
      sub_county_id: 174
    },
    {
      name: 'Makindu',
      sub_county_id: 175
    },
    {
      name: 'Nguumo',
      sub_county_id: 175
    },
    {
      name: 'Kikumbulyu North',
      sub_county_id: 175
    },
    {
      name: 'Kimumbulyu South',
      sub_county_id: 175
    },
    {
      name: 'Nguu/Masumba',
      sub_county_id: 175
    },
    {
      name: 'Emali/Mulala',
      sub_county_id: 175
    },
    {
      name: 'Masongaleni',
      sub_county_id: 176
    },
    {
      name: 'Mtito Andei',
      sub_county_id: 176
    },
    {
      name: 'Thange',
      sub_county_id: 176
    },
    {
      name: 'Ivingoni/Nzambani',
      sub_county_id: 176
    },
    {
      name: 'Engineer',
      sub_county_id: 181
    },
    {
      name: 'Gathara',
      sub_county_id: 181
    },
    {
      name: 'North Kinangop',
      sub_county_id: 181
    },
    {
      name: 'Murungaru',
      sub_county_id: 181
    },
    {
      name: 'Njabini/Kiburu',
      sub_county_id: 181
    },
    {
      name: 'Nyakio',
      sub_county_id: 181
    },
    {
      name: 'Githabai',
      sub_county_id: 181
    },
    {
      name: 'Magumu',
      sub_county_id: 181
    },
    {
      name: 'Wanjohi',
      sub_county_id: 182
    },
    {
      name: 'Kipipiri',
      sub_county_id: 182
    },
    {
      name: 'Geta',
      sub_county_id: 182
    },
    {
      name: 'Githioro',
      sub_county_id: 182
    },
    {
      name: 'Karau',
      sub_county_id: 183
    },
    {
      name: 'Kanjuiri Range',
      sub_county_id: 183
    },
    {
      name: 'Mirangine',
      sub_county_id: 183
    },
    {
      name: 'Kaimbaga',
      sub_county_id: 183
    },
    {
      name: 'Rurii',
      sub_county_id: 183
    },
    {
      name: 'Gathanji',
      sub_county_id: 184
    },
    {
      name: 'Gatima',
      sub_county_id: 184
    },
    {
      name: 'Weru',
      sub_county_id: 184
    },
    {
      name: 'Charagita',
      sub_county_id: 184
    },
    {
      name: 'Leshau/Pondo',
      sub_county_id: 185
    },
    {
      name: 'Kiriita',
      sub_county_id: 185
    },
    {
      name: 'Central',
      sub_county_id: 185
    },
    {
      name: 'Shamata',
      sub_county_id: 185
    },
    {
      name: 'Dedan Kimathi',
      sub_county_id: 191
    },
    {
      name: 'Wamagana',
      sub_county_id: 191
    },
    {
      name: 'Aguthi-Gaaki',
      sub_county_id: 191
    },
    {
      name: 'Mweiga',
      sub_county_id: 192
    },
    {
      name: 'Naromoro Kiamthaga',
      sub_county_id: 192
    },
    {
      name: 'Mwiyogo/Endara Sha',
      sub_county_id: 192
    },
    {
      name: 'Mugunda',
      sub_county_id: 192
    },
    {
      name: 'Gatarakwa',
      sub_county_id: 192
    },
    {
      name: 'Thegu River',
      sub_county_id: 192
    },
    {
      name: 'Kabaru',
      sub_county_id: 192
    },
    {
      name: 'Gakawa',
      sub_county_id: 192
    },
    {
      name: 'Ruguru',
      sub_county_id: 193
    },
    {
      name: 'Magutu',
      sub_county_id: 193
    },
    {
      name: 'Iriani',
      sub_county_id: 193
    },
    {
      name: 'Konyu',
      sub_county_id: 193
    },
    {
      name: 'Kirimukuyu',
      sub_county_id: 193
    },
    {
      name: 'Karatina Town',
      sub_county_id: 193
    },
    {
      name: 'Mahiga',
      sub_county_id: 194
    },
    {
      name: 'Iria-Ini',
      sub_county_id: 194
    },
    {
      name: 'Chinga',
      sub_county_id: 194
    },
    {
      name: 'Karima',
      sub_county_id: 194
    },
    {
      name: 'Gikondi',
      sub_county_id: 195
    },
    {
      name: 'Rugi',
      sub_county_id: 195
    },
    {
      name: 'Mukurwe-Ini West',
      sub_county_id: 195
    },
    {
      name: 'Mukurwe-Ini Central',
      sub_county_id: 195
    },
    {
      name: 'Kiganjo/Mathari',
      sub_county_id: 196
    },
    {
      name: 'Rware',
      sub_county_id: 196
    },
    {
      name: 'Gatitu/Muruguru',
      sub_county_id: 196
    },
    {
      name: 'Ruring’u',
      sub_county_id: 196
    },
    {
      name: 'Kamakwa/Mukaro',
      sub_county_id: 196
    },
    {
      name: 'Mutithi',
      sub_county_id: 201
    },
    {
      name: 'Kangai',
      sub_county_id: 201
    },
    {
      name: 'Wamumu',
      sub_county_id: 201
    },
    {
      name: 'Nyangati',
      sub_county_id: 201
    },
    {
      name: 'Murindiko',
      sub_county_id: 201
    },
    {
      name: 'Gathigiriri',
      sub_county_id: 201
    },
    {
      name: 'Teberer',
      sub_county_id: 201
    },
    {
      name: 'Kabare',
      sub_county_id: 202
    },
    {
      name: 'Baragwi',
      sub_county_id: 202
    },
    {
      name: 'Njukiini',
      sub_county_id: 202
    },
    {
      name: 'Ngariama',
      sub_county_id: 202
    },
    {
      name: 'Karumandi',
      sub_county_id: 202
    },
    {
      name: 'Mukure',
      sub_county_id: 203
    },
    {
      name: 'Kiine',
      sub_county_id: 203
    },
    {
      name: 'Kariti',
      sub_county_id: 203
    },
    {
      name: 'Mutira',
      sub_county_id: 204
    },
    {
      name: 'Kanyekini',
      sub_county_id: 204
    },
    {
      name: 'Kerugoya',
      sub_county_id: 204
    },
    {
      name: 'Inoi',
      sub_county_id: 204
    },
    {
      name: 'Kanyenya-Ini',
      sub_county_id: 211
    },
    {
      name: 'Muguru',
      sub_county_id: 211
    },
    {
      name: 'Rwathia',
      sub_county_id: 211
    },
    {
      name: 'Gituhi',
      sub_county_id: 212
    },
    {
      name: 'Kiru',
      sub_county_id: 212
    },
    {
      name: 'Kamacharia',
      sub_county_id: 212
    },
    {
      name: 'Wangu',
      sub_county_id: 213
    },
    {
      name: 'Mugoiri',
      sub_county_id: 213
    },
    {
      name: 'Mbiri',
      sub_county_id: 213
    },
    {
      name: 'Township',
      sub_county_id: 213
    },
    {
      name: 'Murarandia',
      sub_county_id: 213
    },
    {
      name: 'Gaturi',
      sub_county_id: 213
    },
    {
      name: 'Kahumbu',
      sub_county_id: 214
    },
    {
      name: 'Muthithi',
      sub_county_id: 214
    },
    {
      name: 'Kigumo',
      sub_county_id: 214
    },
    {
      name: 'Kangari',
      sub_county_id: 214
    },
    {
      name: 'Kinyona',
      sub_county_id: 214
    },
    {
      name: 'Kimorori/Wempa',
      sub_county_id: 215
    },
    {
      name: 'Makuyu',
      sub_county_id: 215
    },
    {
      name: 'Kambiti',
      sub_county_id: 215
    },
    {
      name: 'Kamahuha',
      sub_county_id: 215
    },
    {
      name: 'Ichagaki',
      sub_county_id: 215
    },
    {
      name: 'Nginda',
      sub_county_id: 215
    },
    {
      name: 'Ng’ararii',
      sub_county_id: 216
    },
    {
      name: 'Muruka',
      sub_county_id: 216
    },
    {
      name: 'Kangundu-Ini',
      sub_county_id: 216
    },
    {
      name: 'Gaichanjiru',
      sub_county_id: 216
    },
    {
      name: 'Ithiru',
      sub_county_id: 216
    },
    {
      name: 'Ruchu',
      sub_county_id: 216
    },
    {
      name: 'Ithanga',
      sub_county_id: 217
    },
    {
      name: 'Kakuzi/Mitubiri',
      sub_county_id: 217
    },
    {
      name: 'Mugumo-Ini',
      sub_county_id: 217
    },
    {
      name: 'Kihumbu-Ini',
      sub_county_id: 217
    },
    {
      name: 'Gatanga',
      sub_county_id: 217
    },
    {
      name: 'Kariara',
      sub_county_id: 217
    },
    {
      name: 'Kiamwangi',
      sub_county_id: 221
    },
    {
      name: 'Kiganjo',
      sub_county_id: 221
    },
    {
      name: 'Ndarugu',
      sub_county_id: 221
    },
    {
      name: 'Ngenda',
      sub_county_id: 221
    },
    {
      name: 'Gituamba',
      sub_county_id: 222
    },
    {
      name: 'Githobokoni',
      sub_county_id: 222
    },
    {
      name: 'Chania',
      sub_county_id: 222
    },
    {
      name: 'Mang’u',
      sub_county_id: 222
    },
    {
      name: 'Murera',
      sub_county_id: 223
    },
    {
      name: 'Theta',
      sub_county_id: 223
    },
    {
      name: 'Juja',
      sub_county_id: 223
    },
    {
      name: 'Witeithie',
      sub_county_id: 223
    },
    {
      name: 'Kalimoni',
      sub_county_id: 223
    },
    {
      name: 'Township',
      sub_county_id: 224
    },
    {
      name: 'Kamenu',
      sub_county_id: 224
    },
    {
      name: 'Hospital',
      sub_county_id: 224
    },
    {
      name: 'Gatuanyaga',
      sub_county_id: 224
    },
    {
      name: 'Ngoliba',
      sub_county_id: 224
    },
    {
      name: 'Gitothua',
      sub_county_id: 225
    },
    {
      name: 'Biashara',
      sub_county_id: 225
    },
    {
      name: 'Gatongora',
      sub_county_id: 225
    },
    {
      name: 'Kahawa Sukari',
      sub_county_id: 225
    },
    {
      name: 'Kahawa Wendani',
      sub_county_id: 225
    },
    {
      name: 'Kiuu',
      sub_county_id: 225
    },
    {
      name: 'Mwiki',
      sub_county_id: 225
    },
    {
      name: 'Mwihoko',
      sub_county_id: 225
    },
    {
      name: 'Githunguri',
      sub_county_id: 226
    },
    {
      name: 'Githiga',
      sub_county_id: 226
    },
    {
      name: 'Ikinu',
      sub_county_id: 226
    },
    {
      name: 'Ngewa',
      sub_county_id: 226
    },
    {
      name: 'Komothai',
      sub_county_id: 226
    },
    {
      name: 'Ting’gang’a',
      sub_county_id: 227
    },
    {
      name: 'Ndumberi',
      sub_county_id: 227
    },
    {
      name: 'Riabai',
      sub_county_id: 227
    },
    {
      name: 'Township',
      sub_county_id: 227
    },
    {
      name: 'Cianda',
      sub_county_id: 228
    },
    {
      name: 'Karuiri',
      sub_county_id: 228
    },
    {
      name: 'Ndenderu',
      sub_county_id: 228
    },
    {
      name: 'Muchatha',
      sub_county_id: 228
    },
    {
      name: 'Kihara',
      sub_county_id: 228
    },
    {
      name: 'Gitaru',
      sub_county_id: 229
    },
    {
      name: 'Muguga',
      sub_county_id: 229
    },
    {
      name: 'Nyathuna',
      sub_county_id: 229
    },
    {
      name: 'Kabete',
      sub_county_id: 229
    },
    {
      name: 'Uthiru',
      sub_county_id: 229
    },
    {
      name: 'Karai',
      sub_county_id: 2211
    },
    {
      name: 'Nachu',
      sub_county_id: 2211
    },
    {
      name: 'Sigona',
      sub_county_id: 2211
    },
    {
      name: 'Kikuyu',
      sub_county_id: 2211
    },
    {
      name: 'Kinoo',
      sub_county_id: 2211
    },
    {
      name: 'Bibirioni',
      sub_county_id: 2212
    },
    {
      name: 'Limuru Central',
      sub_county_id: 2212
    },
    {
      name: 'Ndeiya',
      sub_county_id: 2212
    },
    {
      name: 'Limuru East',
      sub_county_id: 2212
    },
    {
      name: 'Ngecha Tigoni',
      sub_county_id: 2212
    },
    {
      name: 'Kijabe',
      sub_county_id: 2213
    },
    {
      name: 'Nyanduma',
      sub_county_id: 2213
    },
    {
      name: 'Kamburu',
      sub_county_id: 2213
    },
    {
      name: 'Lari/Kirenga',
      sub_county_id: 2213
    },
    {
      name: 'Kaeris',
      sub_county_id: 231
    },
    {
      name: 'Lake zone',
      sub_county_id: 231
    },
    {
      name: 'Lapur',
      sub_county_id: 231
    },
    {
      name: 'Kaaleng/kaikor',
      sub_county_id: 231
    },
    {
      name: 'Kibish',
      sub_county_id: 231
    },
    {
      name: 'Nakalale',
      sub_county_id: 231
    },
    {
      name: 'Kakuma',
      sub_county_id: 232
    },
    {
      name: 'Lopur',
      sub_county_id: 232
    },
    {
      name: 'Letea',
      sub_county_id: 232
    },
    {
      name: 'Songot',
      sub_county_id: 232
    },
    {
      name: 'Kalobeyei',
      sub_county_id: 232
    },
    {
      name: 'Lokichoggio',
      sub_county_id: 232
    },
    {
      name: 'Nanaam',
      sub_county_id: 232
    },
    {
      name: 'Kerio Delta',
      sub_county_id: 233
    },
    {
      name: 'Kang’atotha',
      sub_county_id: 233
    },
    {
      name: 'Kalokol',
      sub_county_id: 233
    },
    {
      name: 'Lodwar Township',
      sub_county_id: 233
    },
    {
      name: 'Kanamkemer',
      sub_county_id: 233
    },
    {
      name: 'Kotaruk/Lobei',
      sub_county_id: 234
    },
    {
      name: 'Turkwel',
      sub_county_id: 234
    },
    {
      name: 'Loima',
      sub_county_id: 234
    },
    {
      name: 'Lokiriama/Loren Gippi',
      sub_county_id: 234
    },
    {
      name: 'Kaputir',
      sub_county_id: 235
    },
    {
      name: 'Katilu',
      sub_county_id: 235
    },
    {
      name: 'Lobokat',
      sub_county_id: 235
    },
    {
      name: 'Kalapata',
      sub_county_id: 235
    },
    {
      name: 'Lokichar',
      sub_county_id: 235
    },
    {
      name: 'Kapedo/Napeito M',
      sub_county_id: 236
    },
    {
      name: 'Katilia',
      sub_county_id: 236
    },
    {
      name: 'Lokori/Kochodin',
      sub_county_id: 236
    },
    {
      name: 'Riwo',
      sub_county_id: 241
    },
    {
      name: 'Kapenguria',
      sub_county_id: 241
    },
    {
      name: 'Mnagei',
      sub_county_id: 241
    },
    {
      name: 'Siyoi',
      sub_county_id: 241
    },
    {
      name: 'Endugh',
      sub_county_id: 241
    },
    {
      name: 'Sook',
      sub_county_id: 241
    },
    {
      name: 'Sekerr',
      sub_county_id: 242
    },
    {
      name: 'Masool',
      sub_county_id: 242
    },
    {
      name: 'Lomut',
      sub_county_id: 242
    },
    {
      name: 'Weiwei',
      sub_county_id: 242
    },
    {
      name: 'Suam',
      sub_county_id: 243
    },
    {
      name: 'Kodich',
      sub_county_id: 243
    },
    {
      name: 'Kasei',
      sub_county_id: 243
    },
    {
      name: 'Kapchok',
      sub_county_id: 243
    },
    {
      name: 'Kiwawa',
      sub_county_id: 243
    },
    {
      name: 'Alale',
      sub_county_id: 243
    },
    {
      name: 'Chepareria',
      sub_county_id: 244
    },
    {
      name: 'Batei',
      sub_county_id: 244
    },
    {
      name: 'Lelan',
      sub_county_id: 244
    },
    {
      name: 'Tapach',
      sub_county_id: 244
    },
    {
      name: 'Lodokejek',
      sub_county_id: 251
    },
    {
      name: 'Suguta Marmar',
      sub_county_id: 251
    },
    {
      name: 'Maralal',
      sub_county_id: 251
    },
    {
      name: 'Loosuk',
      sub_county_id: 251
    },
    {
      name: 'Poro',
      sub_county_id: 251
    },
    {
      name: 'El-Barta',
      sub_county_id: 252
    },
    {
      name: 'Nachola',
      sub_county_id: 252
    },
    {
      name: 'Ndoto',
      sub_county_id: 252
    },
    {
      name: 'Nyiro',
      sub_county_id: 252
    },
    {
      name: 'Angata Nanyokie',
      sub_county_id: 252
    },
    {
      name: 'Baawa',
      sub_county_id: 252
    },
    {
      name: 'Waso',
      sub_county_id: 253
    },
    {
      name: 'Wamba West',
      sub_county_id: 253
    },
    {
      name: 'Wamba East',
      sub_county_id: 253
    },
    {
      name: 'Wamba North',
      sub_county_id: 253
    },
    {
      name: 'Kapomboi',
      sub_county_id: 261
    },
    {
      name: 'Kwanza',
      sub_county_id: 261
    },
    {
      name: 'Keiyo',
      sub_county_id: 261
    },
    {
      name: 'Bidii',
      sub_county_id: 261
    },
    {
      name: 'Chepchoina',
      sub_county_id: 262
    },
    {
      name: 'Endebess',
      sub_county_id: 262
    },
    {
      name: 'Matumbei',
      sub_county_id: 262
    },
    {
      name: 'Kinyoro',
      sub_county_id: 263
    },
    {
      name: 'Matisi',
      sub_county_id: 263
    },
    {
      name: 'Tuwani',
      sub_county_id: 263
    },
    {
      name: 'Saboti',
      sub_county_id: 263
    },
    {
      name: 'Machewa',
      sub_county_id: 263
    },
    {
      name: 'Kiminini',
      sub_county_id: 264
    },
    {
      name: 'Waitaluk',
      sub_county_id: 264
    },
    {
      name: 'Sirende',
      sub_county_id: 264
    },
    {
      name: 'Sikhendu',
      sub_county_id: 264
    },
    {
      name: 'Nabiswa',
      sub_county_id: 264
    },
    {
      name: 'Hospital',
      sub_county_id: 264
    },
    {
      name: 'Sinyerere',
      sub_county_id: 265
    },
    {
      name: 'Makutano',
      sub_county_id: 265
    },
    {
      name: 'Kaplamai',
      sub_county_id: 265
    },
    {
      name: 'Motosiet',
      sub_county_id: 265
    },
    {
      name: 'Cherangany/ Suwerwa',
      sub_county_id: 265
    },
    {
      name: 'Chepsiro/ Kiptoror',
      sub_county_id: 265
    },
    {
      name: 'Sitatunga',
      sub_county_id: 265
    },
    {
      name: 'Moi’s Bridge',
      sub_county_id: 271
    },
    {
      name: 'Kapkures',
      sub_county_id: 271
    },
    {
      name: 'Ziwa',
      sub_county_id: 271
    },
    {
      name: 'Segero/Barsombe',
      sub_county_id: 271
    },
    {
      name: 'Kipsom Ba',
      sub_county_id: 271
    },
    {
      name: 'Soy',
      sub_county_id: 271
    },
    {
      name: 'Kuinet/Kapsuswa',
      sub_county_id: 271
    },
    {
      name: 'Ngenyilel',
      sub_county_id: 272
    },
    {
      name: 'Tapsagoi',
      sub_county_id: 272
    },
    {
      name: 'Kamagut',
      sub_county_id: 272
    },
    {
      name: 'Kiplombe',
      sub_county_id: 272
    },
    {
      name: 'Kapsaos',
      sub_county_id: 272
    },
    {
      name: 'Huruma',
      sub_county_id: 272
    },
    {
      name: 'Tembelio',
      sub_county_id: 273
    },
    {
      name: 'Sergoit',
      sub_county_id: 273
    },
    {
      name: 'Karuna/Meibeki',
      sub_county_id: 273
    },
    {
      name: 'Moiben',
      sub_county_id: 273
    },
    {
      name: 'Kimumu',
      sub_county_id: 273
    },
    {
      name: 'Kapsoya',
      sub_county_id: 274
    },
    {
      name: 'Kaptagat',
      sub_county_id: 274
    },
    {
      name: 'Ainabkoi/Olare',
      sub_county_id: 274
    },
    {
      name: 'Simat/Kapseret',
      sub_county_id: 275
    },
    {
      name: 'Kipkenyo',
      sub_county_id: 275
    },
    {
      name: 'Ngeria',
      sub_county_id: 275
    },
    {
      name: 'Megun',
      sub_county_id: 275
    },
    {
      name: 'Langas',
      sub_county_id: 275
    },
    {
      name: 'Racecourse',
      sub_county_id: 276
    },
    {
      name: 'Cheptiret/Kipchamo',
      sub_county_id: 276
    },
    {
      name: 'Tulwet/Chuiyat',
      sub_county_id: 276
    },
    {
      name: 'Tarakwa',
      sub_county_id: 276
    },
    {
      name: 'Kapsowar',
      sub_county_id: 281
    },
    {
      name: 'Lelan',
      sub_county_id: 281
    },
    {
      name: 'Sengwe',
      sub_county_id: 281
    },
    {
      name: 'Cherang’any/Chebororwa',
      sub_county_id: 281
    },
    {
      name: 'Moiben/Kuserwo',
      sub_county_id: 281
    },
    {
      name: 'Arror',
      sub_county_id: 281
    },
    {
      name: 'Kapyego',
      sub_county_id: 282
    },
    {
      name: 'Sambirir',
      sub_county_id: 282
    },
    {
      name: 'Endo',
      sub_county_id: 282
    },
    {
      name: 'Embobut / Embulot',
      sub_county_id: 282
    },
    {
      name: 'Emsoo',
      sub_county_id: 283
    },
    {
      name: 'Kamariny',
      sub_county_id: 283
    },
    {
      name: 'Kapchemutwa',
      sub_county_id: 283
    },
    {
      name: 'Tambach',
      sub_county_id: 283
    },
    {
      name: 'Kaptarakwa',
      sub_county_id: 284
    },
    {
      name: 'Chepkorio',
      sub_county_id: 284
    },
    {
      name: 'Soy North',
      sub_county_id: 284
    },
    {
      name: 'Soy South',
      sub_county_id: 284
    },
    {
      name: 'Kabiemit',
      sub_county_id: 284
    },
    {
      name: 'Metkei',
      sub_county_id: 284
    },
    {
      name: 'Songhor/Soba',
      sub_county_id: 291
    },
    {
      name: 'Tindiret',
      sub_county_id: 291
    },
    {
      name: 'Chemelil/ Chemase',
      sub_county_id: 291
    },
    {
      name: 'Kapsimotwo',
      sub_county_id: 291
    },
    {
      name: 'Kabwareng',
      sub_county_id: 292
    },
    {
      name: 'Terik,Kemeloi-Maraba',
      sub_county_id: 292
    },
    {
      name: 'Kobujoi',
      sub_county_id: 292
    },
    {
      name: 'Kaptumo-Kaboi',
      sub_county_id: 292
    },
    {
      name: 'Koyo-Ndurio',
      sub_county_id: 292
    },
    {
      name: 'Nandi Hills',
      sub_county_id: 293
    },
    {
      name: 'Chepkunyuk',
      sub_county_id: 293
    },
    {
      name: 'Ol’lessos',
      sub_county_id: 293
    },
    {
      name: 'Kapchorua',
      sub_county_id: 293
    },
    {
      name: 'Chemundu/Kapng’etuny',
      sub_county_id: 294
    },
    {
      name: 'Kosirai',
      sub_county_id: 294
    },
    {
      name: 'Lelmokwo/ Ngechek',
      sub_county_id: 294
    },
    {
      name: 'Kaptel/ Kamoiywo',
      sub_county_id: 294
    },
    {
      name: 'Kiptuya',
      sub_county_id: 294
    },
    {
      name: 'Chepkumia',
      sub_county_id: 295
    },
    {
      name: 'Kapkangani',
      sub_county_id: 295
    },
    {
      name: 'Kapsabet',
      sub_county_id: 295
    },
    {
      name: 'Kilibwoni',
      sub_county_id: 295
    },
    {
      name: 'Chepterwai',
      sub_county_id: 296
    },
    {
      name: 'Kipkaren',
      sub_county_id: 296
    },
    {
      name: 'Kurgung/ Surungai',
      sub_county_id: 296
    },
    {
      name: 'Kabiyet',
      sub_county_id: 296
    },
    {
      name: 'Ndalat',
      sub_county_id: 296
    },
    {
      name: 'Kabisaga',
      sub_county_id: 296
    },
    {
      name: 'Sangalo/ Kebulonik',
      sub_county_id: 296
    },
    {
      name: 'Kabarnet',
      sub_county_id: 301
    },
    {
      name: 'Sacho',
      sub_county_id: 301
    },
    {
      name: 'Tenges',
      sub_county_id: 301
    },
    {
      name: 'Kapropita',
      sub_county_id: 301
    },
    {
      name: 'Ewalel Chap Chap',
      sub_county_id: 301
    },
    {
      name: 'Barwessa',
      sub_county_id: 302
    },
    {
      name: 'Saimo/Kipsaraman',
      sub_county_id: 302
    },
    {
      name: 'Saimo/Soi',
      sub_county_id: 302
    },
    {
      name: 'Kabartonjo',
      sub_county_id: 302
    },
    {
      name: 'Bartabwa',
      sub_county_id: 302
    },
    {
      name: 'Mukutani',
      sub_county_id: 303
    },
    {
      name: 'Marigat',
      sub_county_id: 303
    },
    {
      name: 'Ilchamus',
      sub_county_id: 303
    },
    {
      name: 'Mochongoi',
      sub_county_id: 303
    },
    {
      name: 'Lembus',
      sub_county_id: 304
    },
    {
      name: 'Ravine',
      sub_county_id: 304
    },
    {
      name: 'Lembus Kwen',
      sub_county_id: 304
    },
    {
      name: 'Koibatek',
      sub_county_id: 304
    },
    {
      name: 'Lembus/Perkerra',
      sub_county_id: 304
    },
    {
      name: 'Mumberes/Maji Mazuri',
      sub_county_id: 304
    },
    {
      name: 'Mogotio',
      sub_county_id: 305
    },
    {
      name: 'Emining',
      sub_county_id: 305
    },
    {
      name: 'Kisanana',
      sub_county_id: 305
    },
    {
      name: 'Tirioko',
      sub_county_id: 306
    },
    {
      name: 'Kolowa',
      sub_county_id: 306
    },
    {
      name: 'Ribkwo',
      sub_county_id: 306
    },
    {
      name: 'Silale',
      sub_county_id: 306
    },
    {
      name: 'Tangulbei/Korossi',
      sub_county_id: 306
    },
    {
      name: 'Loiyamorok',
      sub_county_id: 306
    },
    {
      name: 'Churo/Amaya',
      sub_county_id: 306
    },
    {
      name: 'Ol-Moran',
      sub_county_id: 311
    },
    {
      name: 'Rumuruti',
      sub_county_id: 311
    },
    {
      name: 'Township',
      sub_county_id: 311
    },
    {
      name: 'Githiga',
      sub_county_id: 311
    },
    {
      name: 'Marmanet',
      sub_county_id: 311
    },
    {
      name: 'Igwamiti Salama',
      sub_county_id: 311
    },
    {
      name: 'Ngobit',
      sub_county_id: 312
    },
    {
      name: 'Tigithi',
      sub_county_id: 312
    },
    {
      name: 'Thingithu',
      sub_county_id: 312
    },
    {
      name: 'Nanyuki',
      sub_county_id: 312
    },
    {
      name: 'Umande',
      sub_county_id: 312
    },
    {
      name: 'Sosian',
      sub_county_id: 313
    },
    {
      name: 'Segera',
      sub_county_id: 313
    },
    {
      name: 'Mugogodo West',
      sub_county_id: 313
    },
    {
      name: 'Mugogodo East',
      sub_county_id: 313
    },
    {
      name: 'Mariashoni',
      sub_county_id: 321
    },
    {
      name: 'Elburgon',
      sub_county_id: 321
    },
    {
      name: 'Turi',
      sub_county_id: 321
    },
    {
      name: 'Molo',
      sub_county_id: 321
    },
    {
      name: 'Mau Narok',
      sub_county_id: 322
    },
    {
      name: 'Mauche',
      sub_county_id: 322
    },
    {
      name: 'Kihingo',
      sub_county_id: 322
    },
    {
      name: 'Nessuit',
      sub_county_id: 322
    },
    {
      name: 'Lare',
      sub_county_id: 322
    },
    {
      name: 'Njoro',
      sub_county_id: 322
    },
    {
      name: 'Biashara',
      sub_county_id: 323
    },
    {
      name: 'Hells Gate',
      sub_county_id: 323
    },
    {
      name: 'Lake View',
      sub_county_id: 323
    },
    {
      name: 'Maiella',
      sub_county_id: 323
    },
    {
      name: 'Mai Mahiu',
      sub_county_id: 323
    },
    {
      name: 'Olkaria',
      sub_county_id: 323
    },
    {
      name: 'Naivasha East',
      sub_county_id: 323
    },
    {
      name: 'Viwandani',
      sub_county_id: 323
    },
    {
      name: 'Gilgil',
      sub_county_id: 324
    },
    {
      name: 'Elementaita',
      sub_county_id: 324
    },
    {
      name: 'Mbaruk/Eburu',
      sub_county_id: 324
    },
    {
      name: 'Malewa West',
      sub_county_id: 324
    },
    {
      name: 'Murindati',
      sub_county_id: 324
    },
    {
      name: 'Amalo',
      sub_county_id: 325
    },
    {
      name: 'Keringet',
      sub_county_id: 325
    },
    {
      name: 'Kiptagich',
      sub_county_id: 325
    },
    {
      name: 'Tinet',
      sub_county_id: 325
    },
    {
      name: 'Kiptororo',
      sub_county_id: 326
    },
    {
      name: 'Nyota',
      sub_county_id: 326
    },
    {
      name: 'Sirikwa',
      sub_county_id: 326
    },
    {
      name: 'Kamara',
      sub_county_id: 326
    },
    {
      name: 'Subukia',
      sub_county_id: 327
    },
    {
      name: 'Waseges',
      sub_county_id: 327
    },
    {
      name: 'Kabazi',
      sub_county_id: 327
    },
    {
      name: 'Menengai West',
      sub_county_id: 328
    },
    {
      name: 'Soin',
      sub_county_id: 328
    },
    {
      name: 'Visoi',
      sub_county_id: 328
    },
    {
      name: 'Mosop',
      sub_county_id: 328
    },
    {
      name: 'Solai',
      sub_county_id: 328
    },
    {
      name: 'Dundori',
      sub_county_id: 329
    },
    {
      name: 'Kabatini',
      sub_county_id: 329
    },
    {
      name: 'Kiamaina',
      sub_county_id: 329
    },
    {
      name: 'Lanet/Umoja',
      sub_county_id: 329
    },
    {
      name: 'Bahat',
      sub_county_id: 329
    },
    {
      name: 'Barut',
      sub_county_id: 3211
    },
    {
      name: 'London',
      sub_county_id: 3211
    },
    {
      name: 'Kaptembwo',
      sub_county_id: 3211
    },
    {
      name: 'Kapkures',
      sub_county_id: 3211
    },
    {
      name: 'Rhoda',
      sub_county_id: 3211
    },
    {
      name: 'Shaabab',
      sub_county_id: 3211
    },
    {
      name: 'Biashara',
      sub_county_id: 3212
    },
    {
      name: 'Kivumbini',
      sub_county_id: 3212
    },
    {
      name: 'Flamingo',
      sub_county_id: 3212
    },
    {
      name: 'Menengai',
      sub_county_id: 3212
    },
    {
      name: 'Nakuru East',
      sub_county_id: 3212
    },
    {
      name: 'Kilgoris Centra',
      sub_county_id: 331
    },
    {
      name: 'Keyian',
      sub_county_id: 331
    },
    {
      name: 'Angata Barikoi',
      sub_county_id: 331
    },
    {
      name: 'Shankoe',
      sub_county_id: 331
    },
    {
      name: 'Kimintet',
      sub_county_id: 331
    },
    {
      name: 'Lolgorian',
      sub_county_id: 331
    },
    {
      name: 'Ilkerin',
      sub_county_id: 332
    },
    {
      name: 'Ololmasani',
      sub_county_id: 332
    },
    {
      name: 'Mogondo',
      sub_county_id: 332
    },
    {
      name: 'Kapsasian',
      sub_county_id: 332
    },
    {
      name: 'Olpusimoru',
      sub_county_id: 333
    },
    {
      name: 'Olokurto',
      sub_county_id: 333
    },
    {
      name: 'Narok Town',
      sub_county_id: 333
    },
    {
      name: 'Nkareta',
      sub_county_id: 333
    },
    {
      name: 'Melili',
      sub_county_id: 333
    },
    {
      name: 'Olorropil',
      sub_county_id: 333
    },
    {
      name: 'Mosiro',
      sub_county_id: 334
    },
    {
      name: 'Ildamat',
      sub_county_id: 334
    },
    {
      name: 'Keekonyokie',
      sub_county_id: 334
    },
    {
      name: 'Suswa',
      sub_county_id: 334
    },
    {
      name: 'Majimoto/Naroos',
      sub_county_id: 335
    },
    {
      name: 'Uraololulung’a',
      sub_county_id: 335
    },
    {
      name: 'Melelo',
      sub_county_id: 335
    },
    {
      name: 'Loita',
      sub_county_id: 335
    },
    {
      name: 'Sogoo',
      sub_county_id: 335
    },
    {
      name: 'Sagamian',
      sub_county_id: 335
    },
    {
      name: 'Ilmotiok',
      sub_county_id: 336
    },
    {
      name: 'Mara',
      sub_county_id: 336
    },
    {
      name: 'Siana',
      sub_county_id: 336
    },
    {
      name: 'Naikarra',
      sub_county_id: 336
    },
    {
      name: 'Olkeri',
      sub_county_id: 341
    },
    {
      name: 'Ongata Rongai',
      sub_county_id: 341
    },
    {
      name: 'Nkaimurunya',
      sub_county_id: 341
    },
    {
      name: 'Oloolua',
      sub_county_id: 341
    },
    {
      name: 'Ngong',
      sub_county_id: 341
    },
    {
      name: 'Purko',
      sub_county_id: 342
    },
    {
      name: 'Ildamat',
      sub_county_id: 342
    },
    {
      name: 'Dalalekutuk',
      sub_county_id: 342
    },
    {
      name: 'Matapato North',
      sub_county_id: 342
    },
    {
      name: 'Matapato South',
      sub_county_id: 342
    },
    {
      name: 'Kaputiei North',
      sub_county_id: 343
    },
    {
      name: 'Kitengela',
      sub_county_id: 343
    },
    {
      name: 'Oloosirkon/Sholinke',
      sub_county_id: 343
    },
    {
      name: 'Kenyawa-Poka',
      sub_county_id: 343
    },
    {
      name: 'Imaroro',
      sub_county_id: 343
    },
    {
      name: 'Keekonyokie',
      sub_county_id: 344
    },
    {
      name: 'Iloodokilani',
      sub_county_id: 344
    },
    {
      name: 'Magadi',
      sub_county_id: 344
    },
    {
      name: 'Ewuaso Oonkidong’i',
      sub_county_id: 344
    },
    {
      name: 'Mosiro',
      sub_county_id: 344
    },
    {
      name: 'Entonet/Lenkisi',
      sub_county_id: 345
    },
    {
      name: 'Mbirikani/Eselen',
      sub_county_id: 345
    },
    {
      name: 'Keikuku',
      sub_county_id: 345
    },
    {
      name: 'Rombo',
      sub_county_id: 345
    },
    {
      name: 'Kimana',
      sub_county_id: 345
    },
    {
      name: 'Kunyak',
      sub_county_id: 351
    },
    {
      name: 'Kamasian',
      sub_county_id: 351
    },
    {
      name: 'Kipkelion',
      sub_county_id: 351
    },
    {
      name: 'Chilchila',
      sub_county_id: 351
    },
    {
      name: 'Londiani',
      sub_county_id: 352
    },
    {
      name: 'Kedowa/Kimugul',
      sub_county_id: 352
    },
    {
      name: 'Chepseon',
      sub_county_id: 352
    },
    {
      name: 'Tendeno/Sorget',
      sub_county_id: 352
    },
    {
      name: 'Kapsoit',
      sub_county_id: 353
    },
    {
      name: 'Ainamoi',
      sub_county_id: 353
    },
    {
      name: 'Kipchebor',
      sub_county_id: 353
    },
    {
      name: 'Kapkugerwet',
      sub_county_id: 353
    },
    {
      name: 'Kipchimchim',
      sub_county_id: 353
    },
    {
      name: 'Kapsaos',
      sub_county_id: 353
    },
    {
      name: 'Kisiara',
      sub_county_id: 354
    },
    {
      name: 'Tebesonik',
      sub_county_id: 354
    },
    {
      name: 'Cheboin',
      sub_county_id: 354
    },
    {
      name: 'Chemosot',
      sub_county_id: 354
    },
    {
      name: 'Litein',
      sub_county_id: 354
    },
    {
      name: 'Cheplanget',
      sub_county_id: 354
    },
    {
      name: 'Kapkatet',
      sub_county_id: 354
    },
    {
      name: 'Waldai',
      sub_county_id: 355
    },
    {
      name: 'Kabianga',
      sub_county_id: 355
    },
    {
      name: 'Cheptororiet/Seretut',
      sub_county_id: 355
    },
    {
      name: 'Chaik',
      sub_county_id: 355
    },
    {
      name: 'Kapsuser',
      sub_county_id: 355
    },
    {
      name: 'Sigowet',
      sub_county_id: 356
    },
    {
      name: 'Kaplelartet',
      sub_county_id: 356
    },
    {
      name: 'Soliat',
      sub_county_id: 356
    },
    {
      name: 'Soin',
      sub_county_id: 356
    },
    {
      name: 'Silibwet',
      sub_county_id: 361
    },
    {
      name: 'Township',
      sub_county_id: 361
    },
    {
      name: 'Ndaraweta',
      sub_county_id: 361
    },
    {
      name: 'Singorwet',
      sub_county_id: 361
    },
    {
      name: 'Chesoen',
      sub_county_id: 361
    },
    {
      name: 'Mutarakwa',
      sub_county_id: 361
    },
    {
      name: 'Chepchabas',
      sub_county_id: 362
    },
    {
      name: 'Kimulot',
      sub_county_id: 362
    },
    {
      name: 'Mogogosiek',
      sub_county_id: 362
    },
    {
      name: 'Boito',
      sub_county_id: 362
    },
    {
      name: 'Embomos',
      sub_county_id: 362
    },
    {
      name: 'Merigi',
      sub_county_id: 363
    },
    {
      name: 'Kembu',
      sub_county_id: 363
    },
    {
      name: 'Longisa',
      sub_county_id: 363
    },
    {
      name: 'Kipreres',
      sub_county_id: 363
    },
    {
      name: 'Chemaner',
      sub_county_id: 363
    },
    {
      name: 'Kong’asis',
      sub_county_id: 364
    },
    {
      name: 'Nyangores',
      sub_county_id: 364
    },
    {
      name: 'Sigor',
      sub_county_id: 364
    },
    {
      name: 'Chebunyo',
      sub_county_id: 364
    },
    {
      name: 'Siongiroi',
      sub_county_id: 364
    },
    {
      name: 'Ndanai/Abosi',
      sub_county_id: 365
    },
    {
      name: 'Chemagel',
      sub_county_id: 365
    },
    {
      name: 'Kipsonoi',
      sub_county_id: 365
    },
    {
      name: 'Apletundo',
      sub_county_id: 365
    },
    {
      name: 'Rongena/Manare T',
      sub_county_id: 365
    },
    {
      name: 'Mautuma',
      sub_county_id: 371
    },
    {
      name: 'Lugari',
      sub_county_id: 371
    },
    {
      name: 'Lumakanda',
      sub_county_id: 371
    },
    {
      name: 'Chekalini',
      sub_county_id: 371
    },
    {
      name: 'Chevaywa',
      sub_county_id: 371
    },
    {
      name: 'Lawandeti',
      sub_county_id: 371
    },
    {
      name: 'Likuyani',
      sub_county_id: 372
    },
    {
      name: 'Sango',
      sub_county_id: 372
    },
    {
      name: 'Kongoni',
      sub_county_id: 372
    },
    {
      name: 'Nzoia',
      sub_county_id: 372
    },
    {
      name: 'Sinoko',
      sub_county_id: 372
    },
    {
      name: 'West Kabras',
      sub_county_id: 373
    },
    {
      name: 'Chemuche East',
      sub_county_id: 373
    },
    {
      name: 'Kabras',
      sub_county_id: 373
    },
    {
      name: 'Butali/Chegulo',
      sub_county_id: 373
    },
    {
      name: 'Manda-Shivanga',
      sub_county_id: 373
    },
    {
      name: 'Shirugu-Mugai',
      sub_county_id: 373
    },
    {
      name: 'South Kabras',
      sub_county_id: 373
    },
    {
      name: 'Butsotso East',
      sub_county_id: 374
    },
    {
      name: 'Butsotso South',
      sub_county_id: 374
    },
    {
      name: 'Butsotso Central',
      sub_county_id: 374
    },
    {
      name: 'Sheywe',
      sub_county_id: 374
    },
    {
      name: 'Mahiakalo',
      sub_county_id: 374
    },
    {
      name: 'Shirere',
      sub_county_id: 374
    },
    {
      name: 'Ingostse-Mathia',
      sub_county_id: 375
    },
    {
      name: 'Ingostse-Mathia',
      sub_county_id: 375
    },
    {
      name: 'Esumeyia',
      sub_county_id: 375
    },
    {
      name: 'Bunyala West',
      sub_county_id: 375
    },
    {
      name: 'Bunyal East',
      sub_county_id: 375
    },
    {
      name: 'Bunyala Central',
      sub_county_id: 375
    },
    {
      name: 'Mumias Central',
      sub_county_id: 376
    },
    {
      name: 'Mumias North',
      sub_county_id: 376
    },
    {
      name: 'Etenje',
      sub_county_id: 376
    },
    {
      name: 'Musanda',
      sub_county_id: 376
    },
    {
      name: 'Lusheya/Lubinu',
      sub_county_id: 377
    },
    {
      name: 'Malaha/Isongo/Makunga',
      sub_county_id: 377
    },
    {
      name: 'East Wanga',
      sub_county_id: 377
    },
    {
      name: 'Koyonzo',
      sub_county_id: 378
    },
    {
      name: 'Kholera',
      sub_county_id: 378
    },
    {
      name: 'Khalaba',
      sub_county_id: 378
    },
    {
      name: 'Mayoni',
      sub_county_id: 378
    },
    {
      name: 'Namamali',
      sub_county_id: 378
    },
    {
      name: 'Marama West',
      sub_county_id: 379
    },
    {
      name: 'Marama Central',
      sub_county_id: 379
    },
    {
      name: 'Marenyo-Shianda',
      sub_county_id: 379
    },
    {
      name: 'Maram North',
      sub_county_id: 379
    },
    {
      name: 'Marama South',
      sub_county_id: 379
    },
    {
      name: 'Kisa North',
      sub_county_id: 3711
    },
    {
      name: 'Kisa East',
      sub_county_id: 3711
    },
    {
      name: 'Kisa West',
      sub_county_id: 3711
    },
    {
      name: 'Kisa Central',
      sub_county_id: 3711
    },
    {
      name: 'Isukha North',
      sub_county_id: 3712
    },
    {
      name: 'Murhanda',
      sub_county_id: 3712
    },
    {
      name: 'Isukha Central',
      sub_county_id: 3712
    },
    {
      name: 'Isukha South',
      sub_county_id: 3712
    },
    {
      name: 'Sukha East',
      sub_county_id: 3712
    },
    {
      name: 'Isukha West',
      sub_county_id: 3712
    },
    {
      name: 'Idakho South',
      sub_county_id: 3713
    },
    {
      name: 'Idakho East',
      sub_county_id: 3713
    },
    {
      name: 'Idakho North',
      sub_county_id: 3713
    },
    {
      name: 'Idakho Central',
      sub_county_id: 3713
    },
    {
      name: 'Lugaga-Wamuluma',
      sub_county_id: 381
    },
    {
      name: 'South Maragoli',
      sub_county_id: 381
    },
    {
      name: 'Central Maragoli',
      sub_county_id: 381
    },
    {
      name: 'Mungoma',
      sub_county_id: 381
    },
    {
      name: 'Lyaduywa/Izava',
      sub_county_id: 382
    },
    {
      name: 'West Sabatia',
      sub_county_id: 382
    },
    {
      name: 'Chavakali',
      sub_county_id: 382
    },
    {
      name: 'North Maragoli',
      sub_county_id: 382
    },
    {
      name: 'Wodanga',
      sub_county_id: 382
    },
    {
      name: 'Busali',
      sub_county_id: 382
    },
    {
      name: 'Shiru',
      sub_county_id: 383
    },
    {
      name: 'Gisambai',
      sub_county_id: 383
    },
    {
      name: 'Shamakhokho',
      sub_county_id: 383
    },
    {
      name: 'Banja',
      sub_county_id: 383
    },
    {
      name: 'Muhudi',
      sub_county_id: 383
    },
    {
      name: 'Tambaa',
      sub_county_id: 383
    },
    {
      name: 'Jepkoyai',
      sub_county_id: 383
    },
    {
      name: 'Luanda Township',
      sub_county_id: 384
    },
    {
      name: 'Wemilabi',
      sub_county_id: 384
    },
    {
      name: 'Mwibona',
      sub_county_id: 384
    },
    {
      name: 'Luanda South',
      sub_county_id: 384
    },
    {
      name: 'Emabungo',
      sub_county_id: 384
    },
    {
      name: 'North East Bunyore',
      sub_county_id: 385
    },
    {
      name: 'Central Bunyore',
      sub_county_id: 385
    },
    {
      name: 'West Bunyore',
      sub_county_id: 385
    },
    {
      name: 'Bumula',
      sub_county_id: 391
    },
    {
      name: 'Khasoko',
      sub_county_id: 391
    },
    {
      name: 'Kabula',
      sub_county_id: 391
    },
    {
      name: 'Kimaeti',
      sub_county_id: 391
    },
    {
      name: 'South Bukusu',
      sub_county_id: 391
    },
    {
      name: 'Siboti',
      sub_county_id: 391
    },
    {
      name: 'Cheptais',
      sub_county_id: 392
    },
    {
      name: 'Chesikaki',
      sub_county_id: 392
    },
    {
      name: 'Chepyuk',
      sub_county_id: 392
    },
    {
      name: 'Kapkateny',
      sub_county_id: 392
    },
    {
      name: 'Kaptama',
      sub_county_id: 392
    },
    {
      name: 'Elgon',
      sub_county_id: 392
    },
    {
      name: 'Namwela',
      sub_county_id: 393
    },
    {
      name: 'Malakisi/South Kulisiru',
      sub_county_id: 393
    },
    {
      name: 'Lwandanyi',
      sub_county_id: 393
    },
    {
      name: 'Kabuchai/Chwele',
      sub_county_id: 394
    },
    {
      name: 'West Nalondo',
      sub_county_id: 394
    },
    {
      name: 'Bwake/Luuya',
      sub_county_id: 394
    },
    {
      name: 'Mukuyuni',
      sub_county_id: 394
    },
    {
      name: 'South Bukusu',
      sub_county_id: 394
    },
    {
      name: 'Bukembe West',
      sub_county_id: 395
    },
    {
      name: 'Bukembe East',
      sub_county_id: 395
    },
    {
      name: 'Township',
      sub_county_id: 395
    },
    {
      name: 'Khalaba',
      sub_county_id: 395
    },
    {
      name: 'Musikoma',
      sub_county_id: 395
    },
    {
      name: 'East Snag’alo',
      sub_county_id: 395
    },
    {
      name: 'Marakatu/Tuuti',
      sub_county_id: 395
    },
    {
      name: 'West Sang’alo',
      sub_county_id: 395
    },
    {
      name: 'Mihuu',
      sub_county_id: 396
    },
    {
      name: 'Ndivisi',
      sub_county_id: 396
    },
    {
      name: 'Maraka',
      sub_county_id: 396
    },
    {
      name: 'Sitikho',
      sub_county_id: 397
    },
    {
      name: 'Matulo',
      sub_county_id: 397
    },
    {
      name: 'Bokoli',
      sub_county_id: 397
    },
    {
      name: 'Kibingei',
      sub_county_id: 398
    },
    {
      name: 'Kimilili',
      sub_county_id: 398
    },
    {
      name: 'Maeni',
      sub_county_id: 398
    },
    {
      name: 'Kamukuywa',
      sub_county_id: 398
    },
    {
      name: 'Mbakalo',
      sub_county_id: 399
    },
    {
      name: 'Naitiri/Kabuyefwe',
      sub_county_id: 399
    },
    {
      name: 'Milima',
      sub_county_id: 399
    },
    {
      name: 'Ndalu/Tabani',
      sub_county_id: 399
    },
    {
      name: 'Tongaren',
      sub_county_id: 399
    },
    {
      name: 'Soysambu/Mitu',
      sub_county_id: 399
    },
    {
      name: 'Malaba Central',
      sub_county_id: 401
    },
    {
      name: 'Malaba North',
      sub_county_id: 401
    },
    {
      name: "Ang'urai South",
      sub_county_id: 401
    },
    {
      name: "Ang'urai North",
      sub_county_id: 401
    },
    {
      name: "Ang'urai East",
      sub_county_id: 401
    },
    {
      name: 'Malaba South',
      sub_county_id: 401
    },
    {
      name: "Ang'orom",
      sub_county_id: 402
    },
    {
      name: 'Chakoi South',
      sub_county_id: 402
    },
    {
      name: 'Amukura Central',
      sub_county_id: 402
    },
    {
      name: 'Chakoi North',
      sub_county_id: 402
    },
    {
      name: 'Amukura East',
      sub_county_id: 402
    },
    {
      name: 'Amukura West',
      sub_county_id: 402
    },
    {
      name: 'Nambale Township',
      sub_county_id: 403
    },
    {
      name: 'Bukhayo North/Waltsi',
      sub_county_id: 403
    },
    {
      name: 'Bukhayo East',
      sub_county_id: 403
    },
    {
      name: 'Bukhayo Central',
      sub_county_id: 403
    },
    {
      name: 'Bukhayo West',
      sub_county_id: 404
    },
    {
      name: 'Mayenje',
      sub_county_id: 404
    },
    {
      name: 'Matayos',
      sub_county_id: 404
    },
    {
      name: 'South Busibwabo',
      sub_county_id: 404
    },
    {
      name: 'Burumba',
      sub_county_id: 404
    },
    {
      name: 'Marachi',
      sub_county_id: 405
    },
    {
      name: 'West Kingandole',
      sub_county_id: 405
    },
    {
      name: 'Marachi Central',
      sub_county_id: 405
    },
    {
      name: 'Marachi East',
      sub_county_id: 405
    },
    {
      name: 'Marachi North',
      sub_county_id: 405
    },
    {
      name: 'Elugulu',
      sub_county_id: 405
    },
    {
      name: 'Nangina',
      sub_county_id: 406
    },
    {
      name: "Ageng'a",
      sub_county_id: 406
    },
    {
      name: 'Nanguba',
      sub_county_id: 406
    },
    {
      name: 'Bwiri',
      sub_county_id: 406
    },
    {
      name: 'West Ugenya',
      sub_county_id: 411
    },
    {
      name: 'Ukwala',
      sub_county_id: 411
    },
    {
      name: 'North Ugenya',
      sub_county_id: 411
    },
    {
      name: 'East Ugenya',
      sub_county_id: 411
    },
    {
      name: 'Sidindi',
      sub_county_id: 412
    },
    {
      name: 'Sigomere',
      sub_county_id: 412
    },
    {
      name: 'Ugunja',
      sub_county_id: 412
    },
    {
      name: 'Usonga',
      sub_county_id: 413
    },
    {
      name: 'West Alego',
      sub_county_id: 413
    },
    {
      name: 'Central Alego',
      sub_county_id: 413
    },
    {
      name: 'Siaya Township',
      sub_county_id: 413
    },
    {
      name: 'North Alego',
      sub_county_id: 413
    },
    {
      name: 'South East Alego',
      sub_county_id: 413
    },
    {
      name: 'North Gem',
      sub_county_id: 414
    },
    {
      name: 'West Gem',
      sub_county_id: 414
    },
    {
      name: 'Central Gem',
      sub_county_id: 414
    },
    {
      name: 'Yala Township',
      sub_county_id: 414
    },
    {
      name: 'East Gem',
      sub_county_id: 414
    },
    {
      name: 'South Gem',
      sub_county_id: 414
    },
    {
      name: 'West Yimbo',
      sub_county_id: 415
    },
    {
      name: 'Central Sakwa',
      sub_county_id: 415
    },
    {
      name: 'South Sakwa',
      sub_county_id: 415
    },
    {
      name: 'Yimbo East',
      sub_county_id: 415
    },
    {
      name: 'West Sakwa',
      sub_county_id: 415
    },
    {
      name: 'North Sakwa',
      sub_county_id: 415
    },
    {
      name: 'East Asembo',
      sub_county_id: 416
    },
    {
      name: 'West Asembo',
      sub_county_id: 416
    },
    {
      name: 'North Uyoma',
      sub_county_id: 416
    },
    {
      name: 'South Uyoma',
      sub_county_id: 416
    },
    {
      name: 'West Uyoma',
      sub_county_id: 416
    },
    {
      name: 'Kajulu',
      sub_county_id: 421
    },
    {
      name: 'Kolwa East',
      sub_county_id: 421
    },
    {
      name: 'Manyatta B',
      sub_county_id: 421
    },
    {
      name: 'Nyalenda A',
      sub_county_id: 421
    },
    {
      name: 'Kolwa Central',
      sub_county_id: 421
    },
    {
      name: 'South West Kisumu',
      sub_county_id: 422
    },
    {
      name: 'Cetral Kisumu',
      sub_county_id: 422
    },
    {
      name: 'Kisumu North',
      sub_county_id: 422
    },
    {
      name: 'West Kisumu',
      sub_county_id: 422
    },
    {
      name: 'North West',
      sub_county_id: 422
    },
    {
      name: 'Kisumu',
      sub_county_id: 422
    },
    {
      name: 'Railways',
      sub_county_id: 423
    },
    {
      name: 'Migosi',
      sub_county_id: 423
    },
    {
      name: 'Shaurimoyo Kaloleni',
      sub_county_id: 423
    },
    {
      name: 'Market Milimani',
      sub_county_id: 423
    },
    {
      name: 'Kondele',
      sub_county_id: 423
    },
    {
      name: 'Nyalenda B',
      sub_county_id: 423
    },
    {
      name: 'West Seme',
      sub_county_id: 424
    },
    {
      name: 'Central Seme',
      sub_county_id: 424
    },
    {
      name: 'East Seme',
      sub_county_id: 424
    },
    {
      name: 'North Seme',
      sub_county_id: 424
    },
    {
      name: 'East Kano/Waidhi',
      sub_county_id: 425
    },
    {
      name: 'Awasi/Onjiko',
      sub_county_id: 425
    },
    {
      name: 'Ahero',
      sub_county_id: 425
    },
    {
      name: 'Kabonyo/Kanyag Wal',
      sub_county_id: 425
    },
    {
      name: 'Kobura',
      sub_county_id: 425
    },
    {
      name: 'Miwani',
      sub_county_id: 426
    },
    {
      name: 'Ombeyi',
      sub_county_id: 426
    },
    {
      name: 'Masogo/Nyag’oma',
      sub_county_id: 426
    },
    {
      name: 'Chemelil',
      sub_county_id: 426
    },
    {
      name: 'Muhoroni/Koru',
      sub_county_id: 426
    },
    {
      name: 'South East Nyakach',
      sub_county_id: 427
    },
    {
      name: 'West Nyakach',
      sub_county_id: 427
    },
    {
      name: 'North Nyakach',
      sub_county_id: 427
    },
    {
      name: 'Central Nyakach',
      sub_county_id: 427
    },
    {
      name: 'South West Nyakach',
      sub_county_id: 427
    },
    {
      name: 'West Kasipul',
      sub_county_id: 431
    },
    {
      name: 'South Kasipul',
      sub_county_id: 431
    },
    {
      name: 'Central Kasipul',
      sub_county_id: 431
    },
    {
      name: 'East Kamagak',
      sub_county_id: 431
    },
    {
      name: 'East Kamagak',
      sub_county_id: 431
    },
    {
      name: 'Kabondo East',
      sub_county_id: 432
    },
    {
      name: 'Kabondo West',
      sub_county_id: 432
    },
    {
      name: 'Kokwanyo/Kakel ',
      sub_county_id: 432
    },
    {
      name: 'O Kojwach',
      sub_county_id: 432
    },
    {
      name: 'West Karachuonyo',
      sub_county_id: 433
    },
    {
      name: 'North Karachuonyo',
      sub_county_id: 433
    },
    {
      name: 'Central Kanyaluo',
      sub_county_id: 433
    },
    {
      name: 'Kibiri',
      sub_county_id: 433
    },
    {
      name: 'Wangchieng',
      sub_county_id: 433
    },
    {
      name: 'Kendu Bay',
      sub_county_id: 433
    },
    {
      name: 'Town',
      sub_county_id: 433
    },
    {
      name: 'West Gem',
      sub_county_id: 434
    },
    {
      name: 'East Gem',
      sub_county_id: 434
    },
    {
      name: 'Kagan',
      sub_county_id: 434
    },
    {
      name: 'Kochia',
      sub_county_id: 434
    },
    {
      name: 'Homa Bay Central',
      sub_county_id: 435
    },
    {
      name: 'Homa Bay Arujo',
      sub_county_id: 435
    },
    {
      name: 'Homa Bay West',
      sub_county_id: 435
    },
    {
      name: 'Homa Bay East',
      sub_county_id: 435
    },
    {
      name: 'Kwabwai',
      sub_county_id: 436
    },
    {
      name: 'Kanyadoto',
      sub_county_id: 436
    },
    {
      name: 'Kanyikela',
      sub_county_id: 436
    },
    {
      name: 'Kabuoch North',
      sub_county_id: 436
    },
    {
      name: 'Kabuoch South/Pala',
      sub_county_id: 436
    },
    {
      name: 'Kanyamwa Kologi',
      sub_county_id: 436
    },
    {
      name: 'Kanyamwa Kosewe',
      sub_county_id: 436
    },
    {
      name: 'Mfangano Island',
      sub_county_id: 437
    },
    {
      name: 'Rusinga Island',
      sub_county_id: 437
    },
    {
      name: 'Kasgunga',
      sub_county_id: 437
    },
    {
      name: 'Gember',
      sub_county_id: 437
    },
    {
      name: 'Lambwe',
      sub_county_id: 437
    },
    {
      name: 'Gwassi South',
      sub_county_id: 438
    },
    {
      name: 'Gwassi North',
      sub_county_id: 438
    },
    {
      name: 'Kaksingri West',
      sub_county_id: 438
    },
    {
      name: 'Ruma-Kakshingri',
      sub_county_id: 438
    },
    {
      name: 'North Kamagambo',
      sub_county_id: 441
    },
    {
      name: 'Central Kamagambo',
      sub_county_id: 441
    },
    {
      name: 'East Kamagambo',
      sub_county_id: 441
    },
    {
      name: 'South Kamagambo',
      sub_county_id: 441
    },
    {
      name: 'North East Sakwa',
      sub_county_id: 442
    },
    {
      name: 'South Sakwa',
      sub_county_id: 442
    },
    {
      name: 'West Sakwa',
      sub_county_id: 442
    },
    {
      name: 'Central Sakwa',
      sub_county_id: 442
    },
    {
      name: 'God Jope',
      sub_county_id: 443
    },
    {
      name: 'Suna Central',
      sub_county_id: 443
    },
    {
      name: 'Kakrao',
      sub_county_id: 443
    },
    {
      name: 'Kwa',
      sub_county_id: 443
    },
    {
      name: 'Wiga',
      sub_county_id: 444
    },
    {
      name: 'Wasweta II',
      sub_county_id: 444
    },
    {
      name: 'Ragan-Oruba',
      sub_county_id: 444
    },
    {
      name: 'Wasimbete',
      sub_county_id: 444
    },
    {
      name: 'West Kanyamkago',
      sub_county_id: 445
    },
    {
      name: 'North Kanyamkago',
      sub_county_id: 445
    },
    {
      name: 'Central Kanyam Kago',
      sub_county_id: 445
    },
    {
      name: 'South Kanyamkago',
      sub_county_id: 445
    },
    {
      name: 'East Kanyamkago',
      sub_county_id: 445
    },
    {
      name: 'Kachien’g',
      sub_county_id: 446
    },
    {
      name: 'Kanyasa',
      sub_county_id: 446
    },
    {
      name: 'North Kadem',
      sub_county_id: 446
    },
    {
      name: 'Macalder/ Kanyarwanda',
      sub_county_id: 446
    },
    {
      name: 'Kaler',
      sub_county_id: 446
    },
    {
      name: 'Got Kachola',
      sub_county_id: 446
    },
    {
      name: 'Muhuru',
      sub_county_id: 446
    },
    {
      name: 'Bukira East',
      sub_county_id: 447
    },
    {
      name: 'Bukira Central/ Ikerege',
      sub_county_id: 447
    },
    {
      name: 'Isibania',
      sub_county_id: 447
    },
    {
      name: 'Makerero',
      sub_county_id: 447
    },
    {
      name: 'Masaba',
      sub_county_id: 447
    },
    {
      name: 'Tagare',
      sub_county_id: 447
    },
    {
      name: 'Nyamosense/Ko Mosoko',
      sub_county_id: 447
    },
    {
      name: 'Gokeharaka/Getamwega',
      sub_county_id: 448
    },
    {
      name: 'Ntimaru West',
      sub_county_id: 448
    },
    {
      name: 'Ntimaru East',
      sub_county_id: 448
    },
    {
      name: 'Nyabasi East',
      sub_county_id: 448
    },
    {
      name: 'Nyabasi West',
      sub_county_id: 448
    },
    {
      name: 'Bomariba',
      sub_county_id: 451
    },
    {
      name: 'Bogiakumu',
      sub_county_id: 451
    },
    {
      name: 'Bokeira',
      sub_county_id: 451
    },
    {
      name: 'Riana',
      sub_county_id: 451
    },
    {
      name: 'Bogetenga',
      sub_county_id: 452
    },
    {
      name: 'Borabu/Chitago',
      sub_county_id: 452
    },
    {
      name: 'Moticho',
      sub_county_id: 452
    },
    {
      name: 'Getenga',
      sub_county_id: 452
    },
    {
      name: 'Tabaka',
      sub_county_id: 452
    },
    {
      name: 'Boikanga',
      sub_county_id: 452
    },
    {
      name: 'Borabu Masaba',
      sub_county_id: 453
    },
    {
      name: 'Boochi Borabu',
      sub_county_id: 453
    },
    {
      name: 'Bokimonge',
      sub_county_id: 453
    },
    {
      name: 'Mangeche',
      sub_county_id: 453
    },
    {
      name: 'Nyacheki',
      sub_county_id: 454
    },
    {
      name: 'Bassi Bogetaorio',
      sub_county_id: 454
    },
    {
      name: 'Bobasi Chache',
      sub_county_id: 454
    },
    {
      name: 'Sameta/Mokwerero',
      sub_county_id: 454
    },
    {
      name: 'Bobasi/Boitangare',
      sub_county_id: 454
    },
    {
      name: 'Masige West',
      sub_county_id: 454
    },
    {
      name: 'Masige East',
      sub_county_id: 454
    },
    {
      name: 'Basi Central',
      sub_county_id: 454
    },
    {
      name: 'Majoge Basi',
      sub_county_id: 455
    },
    {
      name: 'Boochi Tendere',
      sub_county_id: 455
    },
    {
      name: 'Bosoti Sengera',
      sub_county_id: 455
    },
    {
      name: 'Ichuni',
      sub_county_id: 456
    },
    {
      name: 'Nyamasibi',
      sub_county_id: 456
    },
    {
      name: 'Masimba',
      sub_county_id: 456
    },
    {
      name: 'Gesusu',
      sub_county_id: 456
    },
    {
      name: 'Kiamokam',
      sub_county_id: 456
    },
    {
      name: 'Keumbu',
      sub_county_id: 457
    },
    {
      name: 'Kiogoro',
      sub_county_id: 457
    },
    {
      name: 'Birongo',
      sub_county_id: 457
    },
    {
      name: 'Ibeno',
      sub_county_id: 457
    },
    {
      name: 'Kisii Central',
      sub_county_id: 457
    },
    {
      name: 'Bobaracho',
      sub_county_id: 457
    },
    {
      name: 'Monyerero',
      sub_county_id: 458
    },
    {
      name: 'Sensi',
      sub_county_id: 458
    },
    {
      name: 'Marani',
      sub_county_id: 458
    },
    {
      name: 'Mwamonari',
      sub_county_id: 458
    },
    {
      name: 'Bogusero',
      sub_county_id: 459
    },
    {
      name: 'Bogeka',
      sub_county_id: 459
    },
    {
      name: 'Nyakoe',
      sub_county_id: 459
    },
    {
      name: 'Kitutu Central',
      sub_county_id: 459
    },
    {
      name: 'Nyatieko',
      sub_county_id: 459
    },
    {
      name: 'Rigoma',
      sub_county_id: 461
    },
    {
      name: 'Gachuba',
      sub_county_id: 461
    },
    {
      name: 'Kemera',
      sub_county_id: 461
    },
    {
      name: 'Magombo',
      sub_county_id: 461
    },
    {
      name: 'Manga',
      sub_county_id: 461
    },
    {
      name: 'Gesima',
      sub_county_id: 461
    },
    {
      name: 'Nyamaiya',
      sub_county_id: 462
    },
    {
      name: 'Bogichora',
      sub_county_id: 462
    },
    {
      name: 'Bosamaro',
      sub_county_id: 462
    },
    {
      name: 'Bonyamatuta',
      sub_county_id: 462
    },
    {
      name: 'Township',
      sub_county_id: 462
    },
    {
      name: 'Itibo',
      sub_county_id: 463
    },
    {
      name: 'Bomwagamo',
      sub_county_id: 463
    },
    {
      name: 'Bokeira',
      sub_county_id: 463
    },
    {
      name: 'Magwagwa',
      sub_county_id: 463
    },
    {
      name: 'Ekerenyo',
      sub_county_id: 463
    },
    {
      name: 'Mekenene',
      sub_county_id: 464
    },
    {
      name: 'Kiabonyoru',
      sub_county_id: 464
    },
    {
      name: 'Esise',
      sub_county_id: 464
    },
    {
      name: 'Nyansiongo',
      sub_county_id: 464
    },
    {
      name: 'Kitisuru',
      sub_county_id: 471
    },
    {
      name: 'Parklands/Highridge',
      sub_county_id: 471
    },
    {
      name: 'Karura',
      sub_county_id: 471
    },
    {
      name: 'Kangemi',
      sub_county_id: 471
    },
    {
      name: 'Mountain View',
      sub_county_id: 471
    },
    {
      name: 'Kilimani',
      sub_county_id: 472
    },
    {
      name: 'Kawangware',
      sub_county_id: 472
    },
    {
      name: 'Gatina',
      sub_county_id: 472
    },
    {
      name: 'Kileleshwa',
      sub_county_id: 472
    },
    {
      name: 'Kabiro',
      sub_county_id: 472
    },
    {
      name: 'Mutu-Ini',
      sub_county_id: 473
    },
    {
      name: 'Ngando',
      sub_county_id: 473
    },
    {
      name: 'Riruta',
      sub_county_id: 473
    },
    {
      name: 'Uthiru/Ruthimitu',
      sub_county_id: 473
    },
    {
      name: 'Waithaka',
      sub_county_id: 473
    },
    {
      name: 'Karen',
      sub_county_id: 474
    },
    {
      name: 'Nairobi West',
      sub_county_id: 474
    },
    {
      name: 'Mugumu-Ini',
      sub_county_id: 474
    },
    {
      name: 'South C',
      sub_county_id: 474
    },
    {
      name: 'Nyayo Highrise',
      sub_county_id: 474
    },
    {
      name: 'Laini Saba',
      sub_county_id: 475
    },
    {
      name: 'Lindi',
      sub_county_id: 475
    },
    {
      name: 'Makina',
      sub_county_id: 475
    },
    {
      name: 'Woodley/Kenyatta',
      sub_county_id: 475
    },
    {
      name: 'Golf Course',
      sub_county_id: 475
    },
    {
      name: 'Sarangombe',
      sub_county_id: 475
    },
    {
      name: 'Githurai',
      sub_county_id: 476
    },
    {
      name: 'Kahawa West',
      sub_county_id: 476
    },
    {
      name: 'Zimmerman',
      sub_county_id: 476
    },
    {
      name: 'Roysambu',
      sub_county_id: 476
    },
    {
      name: 'Kahawa',
      sub_county_id: 476
    },
    {
      name: 'Clay City',
      sub_county_id: 477
    },
    {
      name: 'Mwiki',
      sub_county_id: 477
    },
    {
      name: 'Kasarani',
      sub_county_id: 477
    },
    {
      name: 'Njiru',
      sub_county_id: 477
    },
    {
      name: 'Ruai',
      sub_county_id: 477
    },
    {
      name: 'Baba Dogo',
      sub_county_id: 478
    },
    {
      name: 'Utalii',
      sub_county_id: 478
    },
    {
      name: 'Mathare North',
      sub_county_id: 478
    },
    {
      name: 'Lucky Summer',
      sub_county_id: 478
    },
    {
      name: 'Korogocho',
      sub_county_id: 478
    },
    {
      name: 'Imara Daima',
      sub_county_id: 479
    },
    {
      name: 'Kwa Njenga',
      sub_county_id: 479
    },
    {
      name: 'Kwa Rueben',
      sub_county_id: 479
    },
    {
      name: 'Pipeline',
      sub_county_id: 479
    },
    {
      name: 'Kware',
      sub_county_id: 479
    },
    {
      name: 'Kariobangi North',
      sub_county_id: 4711
    },
    {
      name: 'Dandora Area I',
      sub_county_id: 4711
    },
    {
      name: 'Dandora Area II',
      sub_county_id: 4711
    },
    {
      name: 'Dandora Area III',
      sub_county_id: 4711
    },
    {
      name: 'Dandora Area IV',
      sub_county_id: 4711
    },
    {
      name: 'Kayole North',
      sub_county_id: 4712
    },
    {
      name: 'Kayole Central',
      sub_county_id: 4712
    },
    {
      name: 'Kayole South',
      sub_county_id: 4712
    },
    {
      name: 'Komarock',
      sub_county_id: 4712
    },
    {
      name: 'Matopeni/Spring Valley',
      sub_county_id: 4712
    },
    {
      name: 'Upper Savannah',
      sub_county_id: 4713
    },
    {
      name: 'Lower Savannah',
      sub_county_id: 4713
    },
    {
      name: 'Embakasi',
      sub_county_id: 4713
    },
    {
      name: 'Utawala',
      sub_county_id: 4713
    },
    {
      name: 'Mihango',
      sub_county_id: 4713
    },
    {
      name: 'Umoja I',
      sub_county_id: 4714
    },
    {
      name: 'Umoja II',
      sub_county_id: 4714
    },
    {
      name: 'Mowlem',
      sub_county_id: 4714
    },
    {
      name: 'Kariobangi South',
      sub_county_id: 4714
    },
    {
      name: 'Maringo/Hamza',
      sub_county_id: 4714
    },
    {
      name: 'Viwandani',
      sub_county_id: 4715
    },
    {
      name: 'Harambee',
      sub_county_id: 4715
    },
    {
      name: 'Makongeni',
      sub_county_id: 4715
    },
    {
      name: 'Pumwani',
      sub_county_id: 4715
    },
    {
      name: 'Eastleigh North',
      sub_county_id: 4715
    },
    {
      name: 'Eastleigh South',
      sub_county_id: 4716
    },
    {
      name: 'Airbase',
      sub_county_id: 4716
    },
    {
      name: 'California',
      sub_county_id: 4716
    },
    {
      name: 'Ngara',
      sub_county_id: 4716
    },
    {
      name: 'Nairobi Central',
      sub_county_id: 4716
    },
    {
      name: 'Pangani',
      sub_county_id: 4717
    },
    {
      name: 'Ziwani/Kariokor',
      sub_county_id: 4717
    },
    {
      name: 'Landimawe',
      sub_county_id: 4717
    },
    {
      name: 'Nairobi South',
      sub_county_id: 4717
    },
    {
      name: 'Hospital Ward',
      sub_county_id: 4717
    },
    {
      name: 'Mabatini',
      sub_county_id: 4718
    },
    {
      name: 'Huruma',
      sub_county_id: 4718
    },
    {
      name: 'Ngei',
      sub_county_id: 4718
    },
    {
      name: 'Mlango Kubwa',
      sub_county_id: 4718
    },
    {
      name: 'Kiamaiko',
      sub_county_id: 4718
    }
  ]
};

export default data;
