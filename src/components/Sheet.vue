<template>
	<div class="container-fluid">
		<div class="row">
					
			<main role="main" class="col-md-12 ml-sm-auto col-lg-12 pt-3 px-4">
				<div class="row justify-content-center" v-if="loading">
					<div class="spinner-border" role="status">
						<span class="sr-only">Loading...</span>
					</div>
					cargando...
				</div>
				<div v-else>
					<div class="row justify-content-around py-3">
						<div class="col-4">
							<h4 style="display:inline">Sede: </h4>
							<select class="form-select" v-model="selectedSede">
								<option v-for="(sede,id) in sedes" :value="sede" :key="id">
									{{sede}}
								</option>
							</select>
						</div>
						<div class="col-4">
							<h4 style="display:inline">Trayecto: </h4>
							<select class="form-select " v-model="selectedTrayecto">
								<option v-for="trayecto in trayectos" :key="trayecto">
									{{trayecto}}
							</option>
						</select>
						</div>
					</div>
					<div class="row">
						<div class="col-4">
							<b>Cantidad de Estudiantes:</b>
							<b class="text-info ml-2"> {{hoja.length}} </b>
						</div>
						<div class="text-right col-8">
						
						<button style="border-radius: 1.25rem 1.25rem 0rem 0rem;" type="button" class="btn btn-secondary" @click="copiar()"><i class="bi bi-clipboard-check"></i>copiar tabla</button>
						</div>
					</div>
				
				<div class="table-responsive">
					<table class="table table-striped ">
						<thead>
						<tr>
							<th>FECHA</th>
							<th>SEDE</th>
							<th>TURNO_SEDES</th>
							<th>APELLIDO</th>
							<th>NOMBRE</th>
							<th>DNI</th>
							<th>EDAD</th>
							<th>FECHA_NAC</th>
							<th>DIRECCION</th>
							<th>BARRIO</th>
							<th>LOCALIDAD</th>
							<th>PROVINCIA</th>
							<th>NACIONALIDAD</th>
							<th>CELULAR</th>
							<th>EMAIL</th>
							<th>OBSERVACION</th>
							<th>TRAYECTO</th>
						</tr>
						</thead>
						<tbody>
							<Row v-bind:key="row.id" v-for="row in hoja" v-bind:row="row" />
						</tbody>
					</table>
				</div>
				</div>
			</main>
		</div>
	</div>
</template>
 
<script>
import Row from '@/components/Row.vue';
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('@/client_secret.json');
	export default {
		name: "Sheet",
		components: {
			Row
		},
		props: ["sheet"],
		data() {
			return {
				rows: [],
				loading: true,
				selectedSede:null,
				selectedTrayecto:null,
				sedes:[
					"Caá Yarí",
					"Santa Ana",
					"San José",
					"Azara",
					"General Urquiza",
					"Puerto Piray",
					"Ruiz de Montoya",
					"Puerto Esperanza",
					"Concepción de la Sierra",
					"San Javier",
					"San Pedro",
					"San Ignacio",
					"Guaraní",
					"Comandante Andresito",
					"Alba Posse",
					"Puerto Rico",
					"Apóstoles",
					"Capioví",
					"Puerto Iguazú",
					"El Soberbio",
					"Oberá",
					"San Vicente",
					"Santo Pipó",
					"Dos de Mayo",
					"Campo Grande",
					"Eldorado",
					"Loreto",
					"Colonia Delicia",
					"Puerto Libertad",
					"Pozo Azul",
					"Colonía Victoria",
					"Almafuerte",
					"Santiago de Liniers",
					"Gobernador Roca",
					"Bernardo de Irigoyen",
					"Corpus",
					"Los helechos",
					"Salto Encantado",
					"Montecarlo",
					"Fachinal",
					"Cerro Azul",
					"Panambí",
					"Posadas (Nemesio Parma)",
					"Posadas (Sur Argentino)",
					"Colonia Aurora",
					"Garuhape",
					"Colonia Alberdi",
					"Cerro Corá",
					"San Martín",
					"25 de Mayo",
					"Campo Viera",
					"El Alcazar",
					"Profundidad",
					"Leandro N. Alem",
					"Campo Ramón",
					"Candelaria",
					"Jardín América",
					"Aristóbulo del Valle",
					"Garupá",
					"9 de julio",
					"Arroyo del Medio",
					"Bonpland",
					"Caraguatay",
					"Colonia Polana",
					"Colonia Wanda",
					"Dos Arroyos",
					"Florentino Ameghino",
					"General Alvear",
					"Gobernador López",
					"Hipólito Irigoyen",
					"Itacaruaré",
					"Mártires",
					"Mojón Grande",
					"Olegario Víctor Andrade",
					"Puerto Leoni",
					"San Antonio",
					"Santa María",
					"Tres Capones"
				],
				trayectos:[
					"Mostrar Todos",
					"2022 - TrendKids Básico Normal",
					"2022 - TrendKids Avanzado Normal",
					"2022 - TecnoKids Básico Normal",
					"2022 - TecnoKids Avanzado Normal",
					"2022 - MakerJuniors Básico Normal",
					"2022 - MakerJuniors Avanzado Normal",
					"2022 - TeensMaker Básico Normal",
					"2022 - TeensMaker Avanzado Normal",
					"2022 - TeamInn Básico Normal",
					"2022 - TeamInn Avanzado Normal",
					"2022 - HighMaker Básico Normal",
					"2022 - HighMaker Avanzado Normal"
				]
			}
		},
		methods:{
			copiar(){
				var el = document.querySelector('table');
				var body = document.body, range, sel;
				if (document.createRange && window.getSelection) {
					range = document.createRange();
					sel = window.getSelection();
					sel.removeAllRanges();
					try {
						range.selectNodeContents(el);
						sel.addRange(range);
					} catch (e) {
						range.selectNode(el);
						sel.addRange(range);
					}
				} else if (body.createTextRange) {
					range = body.createTextRange();
					range.moveToElementText(el);
					range.select();
				}
				document.execCommand("Copy");
				sel.removeAllRanges();
			},

			async accessSpreadSheet() {
				//TEST//
				// const doc = new GoogleSpreadsheet('1nYM06gU6HOHVbPtuvDauxTFztMAwb5Is8S1_WKo7bDE');
				// const doc = new GoogleSpreadsheet('1oLGI1u68sPh-P1yhWaU7j_WUTHjFMY1aUu6uINfTb0Q');
				//dani
				const doc = new GoogleSpreadsheet('1jRU5ioDOqs3EFUrKOEmJJBgeFUN2_kX98N0i-3C-xPI');
				await doc.useServiceAccountAuth(creds);
				await doc.loadInfo(); 
				const sheet = doc.sheetsByIndex[0];
					console.log(sheet);
				const  rows = await sheet.getRows({
					offset: 1
				})
				this.rows = rows;
				console.log(this.rows);
				console.log(this.loading);
				this.loading = false;
			}
		},
		computed:{
			hoja:function(){
				// function compare(a, b) {
				// if (a.name < b.name)
				// 	return -1;
				// if (a.name > b.name)
				// 	return 1;
				// return 0;
				// }

				//return this.arrays.sort(compare);
				if(this.selectedTrayecto == "Mostrar Todos"){
					return this.rows.filter(obj => obj.SEDE == this.selectedSede)//.sort(compare);
				
				}else{
					return this.rows.filter(obj => obj.SEDE == this.selectedSede && obj.TRAYECTO_2022 == this.selectedTrayecto)//.sort(compare);	
				}
			}
		},
		created() {
			this.accessSpreadSheet();
		}
		
	}
</script>

<style scoped>

</style>