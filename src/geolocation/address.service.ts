import { Injectable } from '@nestjs/common';
import { Address } from 'cluster';
const { Client } = require("@googlemaps/google-maps-services-js");

@Injectable()
export class AddressService {

    //Gera as coordenadas de cada endereço
    async getAdresses(adresses: Address[]): Promise<any> {
        var address: any
        const list = new Array()
        const geocodingClient = new Client({});

        for(var element of adresses) {
            address = Object.values(element)
            let params = {
                address: address,
                key: "AIzaSyD7sfyH7MevUXYJXKsiPUovEEKm_Mxi-_c"
            }
            geocodingClient.geocode({
                params: params
            }).then((response) => {
                var coordinate = [element, response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng]
                list.push(coordinate)  
                console.log(coordinate);
                
            })
           
        }
        this.distanceCalculation(list)
       
        return list

    }
    
    // metódo que calcula distância entre os endereços.
    // Fixei os valores gerados na função getAdresses, pois minha função estava retornando uma lista vazia
    distanceCalculation(coordinate : Array<any>) : any {
        var x1: any
        var x2: any
        var y1: any
        var y2: any
        var distancia: any
        const listDistancia: any[] = []
        var x: number
        var y: number
        var sum: number
        var endereco1: {}
        var endereco2: {}
        
        coordinate = [
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
                    listDistancia.push(endereco)
                }
            }
        }
        console.log(listDistancia)
        
        var maior : any = listDistancia[0]
        var menor : any = listDistancia[0]

        for(var position3 of listDistancia){
                if(position3[2] > maior[2]){
                    maior = position3
                }else{
                    maior = maior
                }

                if(position3[2] < menor[2]){
                    menor = position3
                }else{
                    menor = menor
                }
               
        }

        return ("Maior distancia é entre: " + maior[0].name + " e "+ maior[1].name +'\n' 
        + "Menor distancia é entre: " + menor[0].name+ " e " + menor[1].name)
       
    }

}


//json body para testar getAdresses, que gera as coordenadas(lat/lgt) para o calculo da distancia

[
    {
        "name" : "Av. Rio Branco,",
        "number" : 1,
        "code" : "20021200",
        "district" : "Centro",
        "sortNameCity" : "RJ"
    },
     {
        "name" : "Rua 19 de Fevereiro",
        "number" : 34,
        "code" : "22280030",
        "district" : "Botafogo,",
        "sortNameCity" : "RJ"
    },
    {
        "name" : "Rua Valdemar Martins",
        "number" : 946,
        "code" : "02535000",
        "district" : "Parque Peruche",
        "sortNameCity" : "SP"
    }
]

