// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentoFirmado {
    address public firmante1;
    address public firmante2;
    address public firmante3;
    string public ipfsHash;

    enum Estado { EnVerificacion, Verificado, NoVerificado }
    Estado public estado;

    mapping(address => bool) public haFirmado;
    mapping(address => uint256) public fechaFirma;

    event Firmado(address indexed firmante, uint256 fecha);
    event EstadoActualizado(Estado nuevoEstado);

    constructor(address _f1, address _f2, address _f3, string memory _ipfsHash) {
        require(_f1 != address(0) && _f2 != address(0) && _f3 != address(0), "Direccion invalida");
        require(_f1 != _f2 && _f1 != _f3 && _f2 != _f3, "Direcciones deben ser unicas");

        firmante1 = _f1;
        firmante2 = _f2;
        firmante3 = _f3;
        ipfsHash = _ipfsHash;

        estado = Estado.EnVerificacion;
    }

    modifier soloFirmantes() {
        require(
            msg.sender == firmante1 ||
            msg.sender == firmante2 ||
            msg.sender == firmante3,
            "No estas autorizado para firmar"
        );
        _;
    }

    modifier enVerificacion() {
        require(estado == Estado.EnVerificacion, "El documento ya fue verificado o rechazado");
        _;
    }

    function firmarDocumento() public soloFirmantes enVerificacion {
        require(!haFirmado[msg.sender], "Ya firmaste el documento");

        haFirmado[msg.sender] = true;
        fechaFirma[msg.sender] = block.timestamp;
        emit Firmado(msg.sender, block.timestamp);

        if (haFirmado[firmante1] && haFirmado[firmante2] && haFirmado[firmante3]) {
            estado = Estado.Verificado;
            emit EstadoActualizado(estado);
        }
    }

    /// Esta función puede usarse si uno de los firmantes decide rechazar o cancelar la verificación
    function marcarNoVerificado() public soloFirmantes enVerificacion {
        estado = Estado.NoVerificado;
        emit EstadoActualizado(estado);
    }

    function fueFirmadoPor(address _addr) public view returns (bool firmado, uint256 fecha) {
        return (haFirmado[_addr], fechaFirma[_addr]);
    }

    function firmadoPorTodos() public view returns (bool) {
        return haFirmado[firmante1] && haFirmado[firmante2] && haFirmado[firmante3];
    }

    function obtenerFirmantes() public view returns (address, address, address) {
        return (firmante1, firmante2, firmante3);
    }

    function obtenerHashIPFS() public view returns (string memory) {
        return ipfsHash;
    }

    function obtenerEstado() public view returns (string memory) {
        if (estado == Estado.EnVerificacion) return "En Verificacion";
        if (estado == Estado.Verificado) return "Verificado";
        return "No Verificado";
    }
}
