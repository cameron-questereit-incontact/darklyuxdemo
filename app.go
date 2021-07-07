package main

import (
	"context"
	//"strconv"
	//"gopkg.in/launchdarkly/go-sdk-common.v2/lduser"
	//"gopkg.in/launchdarkly/go-sdk-common.v2/ldvalue"
	//ld "gopkg.in/launchdarkly/go-server-sdk.v5"
	"log"
	"net/http"
	"os"
	"os/signal"
	//"time"
)

func main() {

	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)

	ctx, cancel := context.WithCancel(context.Background())

	go func() {
		oscall := <-c
		log.Printf("system call:%+v", oscall)
		cancel()
	}()

	if err := serve(ctx); err != nil {
		log.Printf("failed to serve:+%v\n", err)
	}
}

func serve(ctx context.Context) (err error) {

	mux := http.NewServeMux()
	fs := http.FileServer(http.Dir("./static"))
	mux.Handle("/", http.StripPrefix("/", fs))

	srv := &http.Server{
		Addr:    ":3030",
		Handler: mux,
	}

	go func() {
		if err = srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("listen:%+s\n", err)
		}
	}()

	log.Printf("server started")

	// client, _ := ld.MakeClient("sdk-56b259c3-46f4-4c3e-8262-5216c972663d", 5*time.Second)

	// user := lduser.NewUserBuilder("UNIQUE IDENTIFIER").
	// 	FirstName("Bob").
	// 	LastName("Loblaw").
	// 	Custom("groups", ldvalue.String("beta_testers")).
	// 	Build()

	// flagValue, err := client.BoolVariation("cam-is-really-the-best", user, false)

	// log.Printf(strconv.FormatBool(flagValue))

	// if err != nil {
	// 	log.Printf("Failed to initialize darkly client %v", err.Error())
	// }

	 <-ctx.Done()

	// client.Close()

	// log.Printf("server stopped")

	// ctxShutDown, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	// defer func() {
	// 	cancel()
	// }()

	// if err = srv.Shutdown(ctxShutDown); err != nil {
	// 	log.Fatalf("server Shutdown Failed:%+s", err)
	// }

	// log.Printf("server exited properly")

	// if err == http.ErrServerClosed {
	// 	err = nil
	// }

	return
}
