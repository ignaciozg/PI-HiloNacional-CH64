USE hilo_nacional;

-- ========================================
-- 1. USUARIO (5 registros)
-- ========================================
INSERT INTO usuario (email, password, nombre, telefono, fecha_registro) VALUES
('juan.perez@email.com', '$2a$10$passJuan123', 'Juan Pérez López', '8112345678', '2026-03-01'),
('maria.lopez@email.com', '$2a$10$passMaria456', 'María López García', '8112345679', '2026-03-02'),
('pedro.garcia@email.com', '$2a$10$passPedro789', 'Pedro García Ruiz', '8112345680', '2026-03-03'),
('ana.morales@email.com', '$2a$10$passAna101', 'Ana Morales Torres', '8112345681', '2026-03-04'),
('carlos.ruiz@email.com', '$2a$10$passCarlos112', 'Carlos Ruiz Mendoza', '8112345682', '2026-03-05');

-- ========================================
-- 2. COMPRADOR (5 registros - usuarios 1-5)
-- ========================================
INSERT INTO comprador (id_usuario, direccion_envio, cp) VALUES
(1, 'Av. Siempre Viva 123, Apodaca NL', '66650'),
(2, 'Calle Hidalgo 456, Monterrey NL', '64000'),
(3, 'Blvd. Constitución 789, Guadalupe NL', '67190'),
(4, 'Av. Revolución 101, Saltillo Coahuila', '25000'),
(5, 'Calle Morelos 202, Torreón Coahuila', '27000');

-- ========================================
-- 3. VENDEDOR (5 registros - usuarios 1-5)
-- ========================================
INSERT INTO vendedor (id_usuario, rfc, cuenta_bancaria) VALUES
(1, 'PERJ850202ABC', 'BANORTE-1234567890123456'),
(2, 'LOGM920305DEF', 'BBVA-0987654321098765'),
(3, 'GARF910810GH1', 'HSBC-1122334455667788'),
(4, 'MORT780615JK2', 'BANORTE-2233445566778899'),
(5, 'RUMC880420LM3', 'BBVA-3344556677889900');

-- ========================================
-- 4. PRODUCTO (5 registros - vendedores 1-5)
-- ========================================
INSERT INTO producto (id_usuario_vendedor, nombre, descripcion, precio, stock, imagen_url, talla, color) VALUES
(1, 'Camisa blanca con bordado', 'Algodón 100% con bordado artesanal de la Sierra Norte.', 2100.00, 10, '/img/camisaBlanca.jpg', 'M', 'Blanco'),
(2, 'Blusa pintada a mano', 'Diseño floral único pintado con tintes naturales.', 1200.00, 15, '/img/blusapintada.jpg', 'M', 'Azul'),
(3, 'Set de joyería Onix', 'Ónix volcánico pulido con aplicaciones de plata.', 590.00, 3, '/img/collaronix.jpg', NULL, 'Negro'),
(4, 'Guayabera negra', 'Clásica guayabera con alforzas tradicionales.', 933.00, 6, '/img/guayaberanegra.jpg', 'L', 'Negro'),
(5, 'Vestido mesh', 'Transparencias modernas con bordado sutil.', 650.00, 20, '/img/vestidomesh.jpg', 'S', 'Negro');

-- ========================================
-- 5. PEDIDO (5 registros - compradores 1-5)
-- ========================================
INSERT INTO pedido (id_usuario_comprador, fecha_pedido, total, estado, direccion_envio) VALUES
(1, '2026-03-08', 850.00, 'PENDIENTE', 'Av. Siempre Viva 123, Apodaca NL'),
(2, '2026-03-07', 450.00, 'ENVIADO', 'Calle Hidalgo 456, Monterrey NL'),
(3, '2026-03-06', 1200.00, 'ENTREGADO', 'Blvd. Constitución 789, Guadalupe NL'),
(4, '2026-03-05', 950.00, 'PENDIENTE', 'Av. Revolución 101, Saltillo'),
(5, '2026-03-04', 650.00, 'ENVIADO', 'Calle Morelos 202, Torreón');

-- ========================================
-- 6. DETALLE_PEDIDO (5 registros)
-- ========================================
INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES
(1, 1, 1, 850.00),   
(2, 2, 1, 450.00),   
(3, 3, 1, 1200.00), 
(4, 4, 1, 950.00),   
(5, 5, 1, 650.00);   

SELECT * FROM producto;
