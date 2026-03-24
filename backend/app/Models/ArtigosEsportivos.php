<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Throwable;

class ArtigosEsportivos extends Model
{
    /** @use HasFactory<\Database\Factories\ArtigosEsportivosFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'brand',
        'price',
        'year',
        'image',
        'amount',
        'category_id',
    ];

    public function category(){
        return $this->belongsTo(Category::class, 'category_id');
    }

    protected static function booted()
    {
        self::deleted( function(ArtigosEsportivos $artigosEsportivos){
            try{
                $image_name = explode('artigosEsportivos/', $artigosEsportivos['image']);
                Storage::disk('public')->delete('artigosEsportivos/'.$image_name[1]);
            }catch(Throwable){}
        });
    }
}
