<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::unprepared('
        CREATE TRIGGER tr_insert_orders
        AFTER INSERT ON orders
        FOR EACH ROW
        BEGIN
   
            DECLARE exitqty INT;

            SET exitqty = (SELECT COUNT(*) FROM stocks WHERE product_id = NEW.product_id AND location_id = NEW.location_id);
            IF exitqty = 0 THEN
                -- Insert new record into stocks
                INSERT INTO stocks (product_id, location_id, sqty) VALUES (NEW.product_id, NEW.location_id, NEW.qty);
            ELSE 
                -- Update existing record in stocks
                UPDATE stocks SET sqty = sqty + NEW.qty WHERE product_id = NEW.product_id AND location_id = NEW.location_id;
            END IF;

        
        END
    ');

    DB::unprepared('
    CREATE TRIGGER tr_delete_orders
    AFTER DELETE ON orders
    FOR EACH ROW
    BEGIN
        DECLARE exitqty INT;

        SET exitqty = (SELECT COUNT(*) FROM stocks WHERE product_id = OLD.product_id AND location_id = OLD.location_id);
        IF exitqty > 0 THEN
            -- Update existing record in stocks
            UPDATE stocks SET sqty = sqty - OLD.qty WHERE product_id = OLD.product_id AND location_id = OLD.location_id;
        END IF;
    END
    ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP TRIGGER IF EXISTS tr_insert_orders');
    }
};
