CREATE TABLE sys_user (
    id BIGINT PRIMARY KEY,
    open_id VARCHAR(64),
    username VARCHAR(64),
    password_hash VARCHAR(100),
    nickname VARCHAR(64),
    mobile VARCHAR(20),
    user_type VARCHAR(32) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ENABLED',
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    deleted TINYINT NOT NULL DEFAULT 0,
    UNIQUE KEY uk_sys_user_open_id (open_id),
    UNIQUE KEY uk_sys_user_username (username)
);

CREATE TABLE store (
    id BIGINT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    longitude DECIMAL(10, 7),
    latitude DECIMAL(10, 7),
    contact_mobile VARCHAR(20),
    business_status VARCHAR(20) NOT NULL DEFAULT 'CLOSED',
    audit_status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    deleted TINYINT NOT NULL DEFAULT 0
);

CREATE TABLE product (
    id BIGINT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    category_id BIGINT,
    cover_url VARCHAR(500),
    status VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    deleted TINYINT NOT NULL DEFAULT 0
);

CREATE TABLE store_inventory (
    id BIGINT PRIMARY KEY,
    store_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    available_quantity INT NOT NULL DEFAULT 0,
    reserved_quantity INT NOT NULL DEFAULT 0,
    version INT NOT NULL DEFAULT 0,
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    deleted TINYINT NOT NULL DEFAULT 0,
    UNIQUE KEY uk_store_inventory_store_product (store_id, product_id)
);

CREATE TABLE user_order (
    id BIGINT PRIMARY KEY,
    order_no VARCHAR(40) NOT NULL,
    user_id BIGINT NOT NULL,
    store_id BIGINT NOT NULL,
    total_amount BIGINT NOT NULL,
    payable_amount BIGINT NOT NULL,
    order_status VARCHAR(32) NOT NULL,
    pickup_code VARCHAR(20),
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    deleted TINYINT NOT NULL DEFAULT 0,
    UNIQUE KEY uk_user_order_order_no (order_no),
    UNIQUE KEY uk_user_order_pickup_code (pickup_code),
    KEY idx_user_order_user_id (user_id),
    KEY idx_user_order_store_status (store_id, order_status)
);

CREATE TABLE order_item (
    id BIGINT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    product_name VARCHAR(120) NOT NULL,
    unit_price BIGINT NOT NULL,
    quantity INT NOT NULL,
    total_amount BIGINT NOT NULL,
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    deleted TINYINT NOT NULL DEFAULT 0,
    KEY idx_order_item_order_id (order_id)
);
