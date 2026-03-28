<?php

namespace App\Http\Controllers;

use App\Models\ArtigosEsportivos;
use App\Http\Requests\StoreArtigosEsportivosRequest;
use App\Http\Requests\UpdateArtigosEsportivosRequest;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Throwable;

class ArtigosEsportivosController extends Controller
{
    protected $artigosEsportivos;

    public function __construct(ArtigosEsportivos $artigosEsportivos){
        $this->artigosEsportivos = $artigosEsportivos;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $artigosEsportivos = $this->artigosEsportivos->with('category')->get();
        return response()->json($artigosEsportivos, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreArtigosEsportivosRequest $request): JsonResponse
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('artigosEsportivos', 'public');
            $data['image'] = url('storage/' . $path);
        }

        $artigosEsportivos = $this->artigosEsportivos->create($data);
        $id = $artigosEsportivos->id;
        $artigosEsportivos_category = $this->artigosEsportivos->with('category')->findOrFail($id);

        return response()->json($artigosEsportivos_category, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $artigosEsportivos = $this->artigosEsportivos->with('category')->findOrFail($id);
        return response()->json($artigosEsportivos, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateArtigosEsportivosRequest $request, $id): JsonResponse
    {
        $artigosEsportivos = $this->artigosEsportivos->with('category')->findOrFail($id);
        $data = $request->validated();

        if ($request->hasFile('image')) {
            try {
                $image_name = explode('artigosEsportivos/', $artigosEsportivos['image']);
                Storage::disk('public')->delete('artigosEsportivos/'.$image_name[1]);
            } catch (Throwable) {
            } finally {
                $path = $request->file('image')->store('artigosEsportivos', 'public');
                $data['image'] = url('storage/'.$path);
            }
        }

        $artigosEsportivos->update($data);

        return response()->json($artigosEsportivos, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $artigosEsportivos = $this->artigosEsportivos->findOrFail($id);
        $artigosEsportivos->delete();
        return response()->json(['Message' => 'Artigo esportivo deletado com sucesso']);
    }

   public function decrementQtd($id): JsonResponse
    {
    $artigosEsportivos = $this->artigosEsportivos->findOrFail($id);

    if ($artigosEsportivos->amount <= 0) {
        return response()->json(['Message' => 'Artigo esportivo sem estoque disponível']);
    }

    $artigosEsportivos->update(['amount' => $artigosEsportivos->amount - 1]);

    return response()->json($artigosEsportivos, Response::HTTP_OK);
    }

}