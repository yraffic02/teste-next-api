import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()

type ResponseData = {
  message: string,
  lead?: {
    
  };
}

type Data = {
    id?: number;
    name: string;
    email: string;
    telefone: string;
}

export async function POST(
  req: Request,
) {
  if (req.method === 'POST') {
    try {
      const { name, email, telefone } = await req.json()

      if (!name || !email || !telefone) {
        return new NextResponse(
          JSON.stringify({ message: 'Todos os campos são obrigatórios.' }),
          { status: 400 }
        );
      }

      const existsIsLead = await prisma.lead.findUnique({
        where: {
          email
        },
      })

      if (existsIsLead) {
        return new NextResponse(
          JSON.stringify({ message: 'Lead já existe!' }),
          { status: 409 }
        );
      }

      const newLead = await prisma.lead.create({
        data: {
          name,
          email,
          telefone,
        },
      })

      return new NextResponse(
        JSON.stringify({newLead, message: 'Cadastrado com sucesso!' }),
        { status: 201 }
      );

    } catch (error) {
      console.error(error)
      return new NextResponse(
        JSON.stringify({ message: 'Erro ao cadastrar lead.' }),
        { status: 409 }
      );
    } finally {
      await prisma.$disconnect()
    }
  } else {
    return new NextResponse(
      JSON.stringify({ message: `Método ${req.method} não permitido` }),
      { status: 409 }
    );
  }
}
