$(document).ready(function(){

        /* API CLIMA */
        if (navigator.geolocation) {
            function localizacion(posicion){
                var latitud = posicion.coords.latitude;
                var longitud = posicion.coords.longitude;
				
				$.get("http://api.openweathermap.org/data/2.5/weather?units=metric&lat="+latitud+"&lon="+longitud+"&appid=34c742c1798711d24d7f2975e0457732&lang=sp",
                function(data){
                    $.each(data.weather, function(i, item){
                        $("#tablaDatos").append(
                            "<tr>" +
                                "<td>" + item.description.trim().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))) + "</td>" +
                                "<td><img src='http://openweathermap.org/img/wn/" + item.icon +"@2x.png' alt='icono_clima'>"+ 
								data.main.temp +"°C</td>" +
								"<td>" + data.main.humidity + "%</td>" +
							"</tr>"
                        )
                    });
                });
            };

            function error() {
                $("#map").html("<p>No se pudo obtener tu ubicacion</p>");
            };

            navigator.geolocation.getCurrentPosition(localizacion, error);
        }
        else {
            $("#map").html("<p>Tu navegador NO soporta Geolocalizacion</p>");
        }

        /* PREVISUALIZACION IMAGEN */
        function filePreview(input) {
            var extension = /(.mp4)$/i;
            var nombreArchivo = $("#input-btn").val()
            if(!extension.exec(nombreArchivo)) {
                alert('Asegurese de seleccionar un archivo MP4')
                nombreArchivo = '';
                return false;
            }
            else {
                if(input.files && input.files[0]) {
                    var reader = new FileReader();

                    reader.onload = function(e) {
                        $('#previewImagen').html("<video src="+e.target.result+" width='640px' height='360px' controls></video>");
                    }

                    reader.readAsDataURL(input.files[0]);
                };
            }
        }

        $('#input-btn').change(function() {
            filePreview(this);
        });

        $('#btn-limpiar').click(function() {
            $('#previewImagen video').remove();
        })
    });