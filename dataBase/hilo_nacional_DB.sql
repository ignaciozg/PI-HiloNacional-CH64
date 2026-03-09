-- Crear base de datos
CREATE DATABASE IF NOT EXISTS hilo_nacional; 
USE hilo_nacional;

-- 1. ENTIDAD: USUARIO (datos comunes)
CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    fecha_registro VARCHAR (20)
);

-- 2. ENTIDAD: COMPRADOR (herencia 1:1)
CREATE TABLE comprador (
    id_usuario INT PRIMARY KEY,
    direccion_envio TEXT NOT NULL,
    cp VARCHAR(10),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

-- 3. ENTIDAD: VENDEDOR (herencia 1:1)
CREATE TABLE vendedor (
    id_usuario INT PRIMARY KEY,
    rfc VARCHAR(13) UNIQUE NOT NULL,
    cuenta_bancaria VARCHAR(50),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

-- 4. ENTIDAD: PRODUCTO
CREATE TABLE producto (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario_vendedor INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    imagen_url VARCHAR(255),
    talla VARCHAR(10),
    color VARCHAR(30),
    FOREIGN KEY (id_usuario_vendedor) REFERENCES vendedor(id_usuario)
);

-- 5. ENTIDAD: PEDIDO
CREATE TABLE pedido (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario_comprador INT NOT NULL,
    fecha_pedido VARCHAR (10),
    total DECIMAL(10,2) NOT NULL,
    estado ENUM('PENDIENTE', 'ENVIADO', 'ENTREGADO', 'CANCELADO') DEFAULT 'PENDIENTE',
    direccion_envio VARCHAR (30),
    FOREIGN KEY (id_usuario_comprador) REFERENCES comprador(id_usuario),
    INDEX idx_comprador (id_usuario_comprador)
);

-- 6. ENTIDAD: DETALLE_PEDIDO
CREATE TABLE detalle_pedido (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) GENERATED ALWAYS AS (cantidad * precio_unitario) STORED,
    FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

