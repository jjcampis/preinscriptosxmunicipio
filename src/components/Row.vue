<template>
	<tr>
		<td>{{row.FECHA}}</td>
		<td>{{row.SEDE}}</td>
		<td>{{row.TURNO_SEDES}}</td>
		<td>{{row.APELLIDO_DEL_ESTUDIANTE}}</td>
		<td>{{row.NOMBRE_DEL_ESTUDIANTE}}</td>
		<td>{{row.DNI}}</td>
		<td>{{row.EDAD}}</td>
		<td>{{row.FECHA_NAC}}</td>
		<td>{{row.DIRECCION}}</td>
		<td>{{row.BARRIO}}</td>
		<td>{{row.LOCALIDAD}}</td>
		<td>{{row.PROVINCIA}}</td>
		<td>{{row.NACIONALIDAD}}</td>
		<td>{{row.CELULAR}}</td>
		<td>{{row.EMAIL}}</td>
		<td>{{row.OBSERVACION}}</td>
		<td>{{row.TRAYECTO_2022}}</td>
	</tr>
</template>

<script>
	export default {
		name: "Row",
		props: ["row"],
	}
	
</script>

<style scoped>

</style>