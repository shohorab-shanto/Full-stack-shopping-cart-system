<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('products')->insert([
            [
                'name' => 'Premium Wireless Headphones',
                'description' => 'High-fidelity audio with noise cancellation and 40-hour battery life.',
                'price' => 299.99,
                'image' => 'https://placehold.co/600x400/6366f1/ffffff?text=Headphones',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Minimalist Leather Watch',
                'description' => 'Handcrafted genuine leather strap with a scratch-resistant sapphire crystal.',
                'price' => 189.50,
                'image' => 'https://placehold.co/600x400/6366f1/ffffff?text=Watch',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Smart Home Assistant',
                'description' => 'Voice-controlled assistant with premium sound and integrated smart home hub.',
                'price' => 129.99,
                'image' => 'https://placehold.co/600x400/6366f1/ffffff?text=Assistant',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Mechanical Gaming Keyboard',
                'description' => 'RGB backlit keys with tactile switches for the ultimate gaming experience.',
                'price' => 149.00,
                'image' => 'https://placehold.co/600x400/6366f1/ffffff?text=Keyboard',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Ergonomic Office Chair',
                'description' => 'Breathable mesh back with adjustable lumbar support for long working hours.',
                'price' => 349.99,
                'image' => 'https://placehold.co/600x400/6366f1/ffffff?text=Chair',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Portable SSD 1TB',
                'description' => 'Ultra-fast read/write speeds in a compact, durable metal casing.',
                'price' => 119.99,
                'image' => 'https://placehold.co/600x400/6366f1/ffffff?text=SSD',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Professional DSLR Camera',
                'description' => 'Capture stunning photos and 4K videos with this 24.2MP full-frame sensor.',
                'price' => 1299.00,
                'image' => 'https://placehold.co/600x400/6366f1/ffffff?text=Camera',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Noise-Isolating Earbuds',
                'description' => 'Compact design with deep bass and IPX7 water resistance.',
                'price' => 79.99,
                'image' => 'https://placehold.co/600x400/6366f1/ffffff?text=Earbuds',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
