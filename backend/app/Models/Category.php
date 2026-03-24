<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
    ];

    public function ArtigosEsportivos()
    {
        return $this->hasMany(ArtigosEsportivos::class, 'category_id', 'id');
    }

    protected static function booted()
    {
        self::deleting(function(Category $category){
            $category->ArtigosEsportivos()->each(function (ArtigosEsportivos $artigosEsportivos){
                $artigosEsportivos->delete();
            });
        });
    }

}
