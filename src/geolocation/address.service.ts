import { Injectable } from '@nestjs/common';
import { Address } from 'cluster';
const { Client } = require("@googlemaps/google-maps-services-js");

@Injectable()
export class AddressService {

    getHello(): string {
        return 'Hello World!';
    }

    getAdresses(adresses: Address[]): any {
        var address: any
        var list: any[] = []
        var conta: number

        adresses.forEach(element => {
            address = Object.values(element)

            const geocodingClient = new Client({});
            let params = {
                address: address,
                key: "AIzaSyD7sfyH7MevUXYJXKsiPUovEEKm_Mxi-_c"
            }
            geocodingClient.geocode({
                params: params
            }).then((response) => {
                var coordinate = [element, response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng]
                list.push(coordinate)
                console.log(list);
            })

        })
        console.log(list);

        return list

    }



    async getCoordinate(getAddress: string): Promise<any> {
        var streetAddress = 'Rua Valdemar Martins 116 02535000 Parque Peruche SP'
        const geocodingClient = new Client({});

        let params = {
            address: getAddress,

            key: "AIzaSyD7sfyH7MevUXYJXKsiPUovEEKm_Mxi-_c"
        }

        console.log('retrieving lat, lng for ' + getAddress);
        geocodingClient.geocode({
            params: params
        })
            .then((response) => {
                // console.log('status: ' + response.data.status);
                // console.log(response.data.results[0].geometry.location.lat);
                console.log(response.data.results[0].geometry.location.lng);
                // console.log(response);
                console.log("aqui2");
                var coordinate = [response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lat]
                console.log(coordinate);

                return coordinate
            })
            .catch((error) => {
                console.log('error retrieving geocoded results');
            });

    }

    testeConta() : any {
        var x1: any
        var x2: any
        var y1: any
        var y2: any
        var distancia: any
        var listDistancia: any[] = []
        var x: number
        var y: number
        var sum: number
        

        var endereco1: {}
        var endereco2: {}
        const coordinate = [
            [
                {
                    name: 'Rua Valdemar Martins',
                    number: 946,
                    code: '02535000',
                    district: 'Parque Peruche',
                    sortNameCity: 'SP'
                },
                -23.4939148,
                -46.65425
            ],
            [
                {
                    name: 'Rua 19 de Fevereiro',
                    number: 34,
                    code: '22280030',
                    district: 'Botafogo,',
                    sortNameCity: 'RJ'
                },
                -22.9507467,
                -43.1876525
            ],
            [
                {
                    name: 'Av. Rio Branco,',
                    number: 1,
                    code: '20021200',
                    district: 'Centro',
                    sortNameCity: 'RJ'
                },
                -22.8973551,
                -43.1802782
            ]
        ]

        const distancias = [
            [
                {
                  name: 'Rua 19 de Fevereiro',
                  number: 34,
                  code: '22280030',
                  district: 'Botafogo,',
                  sortNameCity: 'RJ'
                },
                {
                  name: 'Rua Valdemar Martins',
                  number: 946,
                  code: '02535000',
                  district: 'Parque Peruche',
                  sortNameCity: 'SP'
                },
                3.5088929610154613
              ],
             
              [
                {
                  name: 'Rua 19 de Fevereiro',
                  number: 34,
                  code: '22280030',
                  district: 'Botafogo,',
                  sortNameCity: 'RJ'
                },
                {
                  name: 'Av. Rio Branco,',
                  number: 1,
                  code: '20021200',
                  district: 'Centro',
                  sortNameCity: 'RJ'
                },
                0.05389845314153423
              ],
              [
                {
                  name: 'Av. Rio Branco,',
                  number: 1,
                  code: '20021200',
                  district: 'Centro',
                  sortNameCity: 'RJ'
                },
                {
                  name: 'Rua Valdemar Martins',
                  number: 946,
                  code: '02535000',
                  district: 'Parque Peruche',
                  sortNameCity: 'SP'
                },
                3.524821065367622
              ],
              [
                {
                  name: 'Av. Rio Branco,',
                  number: 1,
                  code: '20021200',
                  district: 'Centro',
                  sortNameCity: 'RJ'
                },
                {
                  name: 'Rua 19 de Fevereiro',
                  number: 34,
                  code: '22280030',
                  district: 'Botafogo,',
                  sortNameCity: 'RJ'
                },
                0.05389845314153423
              ],
        ]

        for (var position1 of coordinate) {

            for (var position2 of coordinate) {
                endereco1 = position1[0]
                endereco2 = position2[0]
                x1 = position1[1]
                x2 = position2[1]
                x = (x1 - x2) * (x1 - x2)
                y1 = position1[2]
                y2 = position2[2]
                y = (y1 - y2) * (y1 - y2)
                sum = x + y
                distancia = Math.sqrt(sum)
                var endereco = [endereco1, endereco2, distancia]
                if (distancia != 0) {

                    listDistancia.push.apply(endereco)
                }
                //listDistancia.push(endereco1)
                //console.log(endereco);

                //console.log(listDistancia)
            }
        }

        var maior : any = distancias[0]
        var menor : any = distancias[0]

        for(var position1 of distancias){
                if(position1[2] > maior[2]){
                    maior = position1
                }else{
                    maior = maior
                }

                if(position1[2] < menor[2]){
                    menor = position1
                }else{
                    menor = menor
                }
                // console.log("maior ");
                // console.log(maior);
                // console.log('menor');
                // console.log(menor); 
        }

        console.log("maior ");
        console.log(maior);
        console.log('menor');
        console.log(menor); 
        return ("maior distancia" + maior + "menor distancia" + menor)

    }

}


// [
//     {
//         "name" : "Av. Rio Branco,",
//         "number" : 1,
//         "code" : "20021200",
//         "district" : "Centro",
//         "sortNameCity" : "RJ"
//     },
//      {
//         "name" : "Rua 19 de Fevereiro",
//         "number" : 34,
//         "code" : "22280030",
//         "district" : "Botafogo,",
//         "sortNameCity" : "RJ"
//     },
//     {
//         "name" : "Rua Valdemar Martins",
//         "number" : 946,
//         "code" : "02535000",
//         "district" : "Parque Peruche",
//         "sortNameCity" : "SP"
//     }
// ]

