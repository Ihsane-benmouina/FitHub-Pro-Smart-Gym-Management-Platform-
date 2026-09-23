<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AdminUserController extends Controller
{
    public function index()
    {
        return response()->json(
            User::latest()->get()
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:admin,coach,receptionniste',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => $request->role,
            'is_active' => true,
        ]);

        return response()->json([
            'message' => 'Compte créé avec succès',
            'user' => $user,
        ], 201);
    }

    public function updateRole(Request $request, $id)
    {
        $request->validate([
            'role' => 'required|in:admin,coach,receptionniste,adherent',
        ]);

        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'Utilisateur introuvable'
            ], 404);
        }

        $user->update([
            'role' => $request->role
        ]);

        return response()->json([
            'message' => 'Rôle modifié avec succès',
            'user' => $user
        ]);
    }

    public function toggleStatus($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'Utilisateur introuvable'
            ], 404);
        }

        $user->update([
            'is_active' => !$user->is_active
        ]);

        return response()->json([
            'message' => 'Statut modifié avec succès',
            'user' => $user
        ]);
    }
}